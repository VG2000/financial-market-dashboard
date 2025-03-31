from django.db import models

class Bond(models.Model):
    region = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    maturity = models.CharField(max_length=10)

    yield_rate = models.DecimalField(max_digits=6, decimal_places=4)         # 4.1501
    price_change_day = models.DecimalField(max_digits=6, decimal_places=4)   # 0.0819

    percentage_week = models.DecimalField(max_digits=5, decimal_places=4)    # 0.0015
    percentage_month = models.DecimalField(max_digits=5, decimal_places=4)   # 0.0027
    percentage_year = models.DecimalField(max_digits=5, decimal_places=4)    # 0.0254

    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.country.upper()} {self.maturity}"





