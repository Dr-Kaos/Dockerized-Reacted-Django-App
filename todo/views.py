import json
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader
from django.views.generic import ListView
from django.core import serializers
from django.urls import reverse
from django.shortcuts import get_object_or_404
# Create your views here.
from .models import Todo

def index(request):
    template = loader.get_template('todo/index.html')
    return HttpResponse(template.render(None, request))

def list(ListView):
    todo_list = Todo.objects.all()
    data = serializers.serialize('json', todo_list)
    return HttpResponse(data, content_type='application/json')

def create(request):
    data = json.loads(request.body)
    print("############", data)
    Todo.objects.create(todo_text=data['todo_input'])
    return JsonResponse({'result': 'ok'})

def delete(request):
    data = json.loads(request.body)
    id = data['id']       
    task = get_object_or_404(Todo, pk=id)
    task.delete()
    return JsonResponse({'result': 'ok'})