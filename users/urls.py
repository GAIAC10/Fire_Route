from django.urls import path
from users import views
app_name = 'users'

urlpatterns = [
    path('login_check', views.login_check),
    path('life', views.escape_route, name='escape_route'),
    path('save', views.rescue_route),
    path('line', views.make_line),
    path('loginout', views.login_out_view, name='login_out')
]