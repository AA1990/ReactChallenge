from django.contrib.auth.models import User, Group
from polls.models import Bici, Reservation
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'password', 'id']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class BiciSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bici
        fields = ['url', 'model', 'color', 'location', 'ranking', 'enable', 'id']

class ReservationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Reservation
        fields = ['url', 'bici', 'user', 'from_date', 'to_date', 'ranking', 'bici_id', 'user_id', 'id']
