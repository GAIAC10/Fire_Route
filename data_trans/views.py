from django.shortcuts import render
from data_trans.models import data_trans_Profile
from django.http import JsonResponse


# Create your views here.
def get_data_from_web(request):
    # ""填硬件方的名字
    data_trans_01 = request.GET.get("p")
    data_trans_Profile.objects.create(data_in_01=data_trans_01)
    return render(request, "homepage.html")


def update_data(request):
    mysql_data = data_trans_Profile.objects.order_by("-id").first()
    data_trans_01 = mysql_data.data_in_01
    result = {"code": 200, "data": {"data_train_01": data_trans_01}}
    return JsonResponse(result)
