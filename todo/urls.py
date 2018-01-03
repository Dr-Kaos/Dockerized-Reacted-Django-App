from django.conf.urls import url
from . import views

app_name = 'todo'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'api/todo_list/', views.list, name='list'),
    url(r'api/create/', views.create, name='create'),
    url(r'api/delete/', views.delete, name='delete'),
]