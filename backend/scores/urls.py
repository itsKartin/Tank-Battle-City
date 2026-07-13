from django.urls import path
from .views import ScoreListCreate

urlpatterns = [
    path('scores/', ScoreListCreate.as_view(), name='score-list-create'),
]