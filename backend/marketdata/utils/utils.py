import requests
from datetime import datetime
from decimal import Decimal
from django.conf import settings
from marketdata.models import Bond

def parse_percentage(value: str) -> Decimal:
    """Convert '0.15%' -> Decimal('0.0015')"""
    if value and value.endswith('%'):
        return Decimal(value.strip('%')) / 100
    return Decimal("0.0")

def refresh_bond_data():
    API_KEY = settings.FINNWORLDS_API_KEY
    BASE_URL = "https://api.finnworlds.com/api/v1/bonds"

    TYPES = ['2y', '5y', '10y']
    COUNTRIES = ['united_kingdom']

    for country in COUNTRIES:
        for bond_type in TYPES:
            url = f"{BASE_URL}?key={API_KEY}&country={country}&type={bond_type}"
            print(f"📡 Fetching: {url}")

            try:
                response = requests.get(url)
                response.raise_for_status()
                data_items = response.json().get("result", {}).get("output", [])


                if not data_items:
                    print(f"⚠️ No data for {country} {bond_type}")
                    continue

                data = data_items[0]

                Bond.objects.update_or_create(
                    country=data.get("country", "").lower(),
                    maturity=data.get("type", "").lower(),  # renamed field
                    defaults={
                        "region": data.get("region", "").lower(),
                        "yield_rate": Decimal(data.get("yield") or "0.0"),
                        "price_change_day": Decimal(data.get("price_change_day").strip('%') or "0.0"),
                        "percentage_week": parse_percentage(data.get("percentage_week") or "0%"),
                        "percentage_month": parse_percentage(data.get("percentage_month") or "0%"),
                        "percentage_year": parse_percentage(data.get("percentage_year") or "0%"),
                    },
                )

            except Exception as e:
                print(f"❌ Error processing {country} {bond_type}: {e}")
