from django.urls import path
from leave.views import(
    LeaveListView,
    LeaveDetailView,
    LeaveApprovedView,
    LeaveRejectView,
    LoginView,
    LogoutView,
    SignupView,
    AdminUserListView,
    AdminUserDetailView
)

urlpatterns=[

    path('auth/login/',LoginView.as_view(),name='login'),
    path('auth/logout/',LogoutView.as_view(),name='logout'),
    path('auth/signup/',SignupView.as_view(),name='signup'),

    path('leaves/',LeaveListView.as_view(),name='leave-list'),

    path('leaves/<int:leave_id>/',LeaveDetailView.as_view(),name='leave-detail'),

    path('leaves/<int:leave_id>/approve/',LeaveApprovedView.as_view(),name='leave-approve'),

    path('leaves/<int:leave_id>/reject/',LeaveRejectView.as_view(),name='leave-reject'),

    path('admin/users/',AdminUserListView.as_view(),name='admin_users'),
    path('admin/users/<int:user_id>/',AdminUserDetailView.as_view(),name='admin_user_detail'),
]
