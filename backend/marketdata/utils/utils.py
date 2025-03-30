import requests
from datetime import datetime
from decimal import Decimal
from marketdata.models import Bond

def parse_percentage(value: str) -> Decimal:
    """Convert '0.15%' -> Decimal('0.0015')"""
    if value.endswith('%'):
        return Decimal(value.strip('%')) / 100
    return Decimal(value)

def refresh_bond_data():
    API_KEY = settings.FINNWORLDS_API_KEY
    BASE_URL = "https://api.finnworlds.com/api/v1/bonds"

    TYPES = ['2y', '5y', '10y']
    COUNTRIES = ['germany', 'france', 'us', 'uk']

    for country in COUNTRIES:
        for bond_type in TYPES:
            url = f"{BASE_URL}?key={API_KEY}&country={country}&type={bond_type}"
            print(f"Fetching: {url}")

            try:
                response = requests.get(url)
                response.raise_for_status()
                data = response.json().get("data", {})

                Bond.objects.update_or_create(
                    country=data.get("country", "").lower(),
                    type=data.get("type", "").lower(),
                    date=datetime.strptime(data.get("date"), "%Y:%m:%d").date(),
                    defaults={
                        "region": data.get("region", "").lower(),
                        "yield_rate": Decimal(data.get("yield")),
                        "price_change_day": Decimal(data.get("price_change_day")),
                        "percentage_week": parse_percentage(data.get("percentage_week")),
                        "percentage_month": parse_percentage(data.get("percentage_month")),
                        "percentage_year": parse_percentage(data.get("percentage_year")),
                    },
                )

            except Exception as e:
                print(f"Error processing {country} {bond_type}: {e}")