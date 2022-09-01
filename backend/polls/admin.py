from django.contrib import admin

from .models import Bici, Reservation

admin.site.register(Bici)
admin.site.register(Reservation)