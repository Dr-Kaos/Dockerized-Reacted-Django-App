from django.db import models
from django.utils import timezone
import datetime

# Create your models here.
class Todo(models.Model):
    todo_text = models.CharField('TODO Task', max_length=200)
    todo_start_date = models.DateField('Start Date', default=timezone.now)
    todo_due_date = models.DateField('Due Date', default=timezone.now()+datetime.timedelta(days=10))
    todo_status = models.BooleanField(default=False)

    def __str__(self):
        return self.todo_text