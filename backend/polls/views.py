from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello Augusto Ascanio, world. You're at the polls index.")