from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from api.serializers import UserSerializer, GroupSerializer, BiciSerializer , ReservationSerializer
from polls.models import Bici, Reservation
from django.db.models import Q


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    '''permission_classes = [permissions.IsAuthenticated]'''
    def get_queryset(self):
        """
        Optionally restricts the returned articles to given regions,
        by filtering against a `regions` query parameter in the URL.
        """
        username = self.request.query_params.get("username", None)
        password = self.request.query_params.get("password", None)
        if username and password:
            qs = User.objects.filter(username=username, password=password)
            return qs

        return super().get_queryset()


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class BiciViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Bici.objects.all()
    serializer_class = BiciSerializer
    def get_queryset(self):
        from_date = self.request.query_params.get("from", None)
        to_date = self.request.query_params.get("to", None)
        enable = self.request.query_params.get("enable", None)
        if from_date and to_date:
            reserved = Reservation.objects.filter(Q(from_date__range=[from_date, to_date])| Q(to_date__range=[from_date, to_date])).values_list('bici_id').distinct()
            qs = Bici.objects.filter(enable=True).exclude(id__in=reserved)
            print (qs)
            return qs
        if enable:
            qs = Bici.objects.filter(enable=enable)
            return qs
        return super().get_queryset()

class ReservationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    def get_queryset(self):
        from_date = self.request.query_params.get("from", None)
        to_date = self.request.query_params.get("to", None)
        user = self.request.query_params.get("user", None)
        if from_date and to_date:
            qs = Reservation.objects.filter(Q(from_date__range=[from_date, to_date])| Q(to_date__range=[from_date, to_date]))
            if user:
                qs = Reservation.objects.filter(user=user).filter(Q(from_date__range=[from_date, to_date])| Q(to_date__range=[from_date, to_date]))
                return qs
            else:
                return qs
        if user and (not(from_date) or not(to_date)):
            qs = Reservation.objects.filter(user=user)
            return qs
        return super().get_queryset()