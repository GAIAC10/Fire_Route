from django.db import models


# Create your models here.

class usersProfile(models.Model):
    username = models.CharField(verbose_name='用户名', max_length=30, primary_key=True)
    password = models.CharField(verbose_name='密码', max_length=30)
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users_info'
