from django.db import models


# Create your models here.
class data_trans_Profile(models.Model):
    id = models.AutoField(verbose_name="编号", primary_key=True)
    data_in_01 = models.CharField(verbose_name="执行码", max_length=10, default=None, null=True)

    class Meta:
        db_table = "data_trans_info"
