from django.shortcuts import render
from django.http import JsonResponse
import json
from users.models import usersProfile
import jwt
from django.conf import settings
import time


# Create your views here.
def escape_route(request):
    return render(request, "escape_route.html")


def rescue_route(request):
    return render(request, "rescue_route.html")


def make_line(request):
    return render(request, "make_line.html")


def login_check(request):
    if request.method != 'POST':
        result = {'code': 10200, 'error': 'Please use POST'}
        return JsonResponse(result)
    json_str = request.body
    json_obj = json.loads(json_str)
    username = json_obj['username']
    password = json_obj['password']
    # 校验用户名和密码
    try:
        user = usersProfile.objects.get(username=username)
    except Exception as e:
        result = {'code': 10201, 'error': 'The username or password is wrong'}
        return JsonResponse(result)
    if password != user.password:
        result = {'code': 10202, 'error': 'The username or password is wrong'}
        return JsonResponse(result)
    # 记录会话状态
    token = make_token(username)
    result = {'code': 200, 'username': username, 'data': {'token': token}}
    return JsonResponse(result)


# 生成token
def make_token(username, expire=3600 * 24):
    # 在settings中去配置key
    key = settings.JWT_TOKEN_KEY
    new_t = time.time()
    payload_data = {'username': username, 'exp': new_t + expire}
    # 生成的jwt是字节串
    return jwt.encode(payload_data, key, algorithm='HS256')


def login_out_view(request):
    # 删除session值：
    # if 'username' in request.session:
    #     del request.session['username']
    # if 'uid' in request.session:
    #     del  request.session['uid']
    # 删除Cookie：
    # resp=HttpResponseRedirect('/index')
    # if 'username' in request.COOKIES:
    #     resp.delete_cookie('username')
    # if 'uid' in request.COOKIES:
    #     resp.delete_cookie('uid')
    return render(request, 'homepage.html')
