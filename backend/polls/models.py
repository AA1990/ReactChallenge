from django.db import models
from django.contrib.auth.models import User, Group

class Bici(models.Model):
    model = models.CharField(max_length=200, blank=True)
    color = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=200, blank=True)
    enable = models.BooleanField(default=True)
    ranking = models.IntegerField(blank=True, null=True)
    #pub_date = models.DateTimeField('date published')


class Reservation(models.Model):
    bici = models.ForeignKey(Bici, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    from_date = models.DateTimeField('date from')
    to_date = models.DateTimeField('date to')
    ranking = models.IntegerField(blank=True, null=True)
    #choice_text = models.CharField(max_length=200)
    #votes = models.IntegerField(default=0)
    def save(self, *args, **kwargs):
        ranking_bici = self.bici.ranking
        if ranking_bici:
            if self.ranking:
                ranking_bici = int(ranking_bici + self.ranking)/2
            else:
                ranking_bici = ranking_bici
        else:
            ranking_bici = self.ranking
        Bici.objects.filter(id=self.bici.id).update(ranking=ranking_bici)
        #reserved = Reservation.objects.filter()
        # Some Business Logic
        # Call super to continue the flow -- from below line we are unable to invoke super
        super().save(*args, **kwargs)