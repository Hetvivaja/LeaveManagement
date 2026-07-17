from django.urls import path
from leave.views import(
    LeaveListView,
    LeaveDetailView,
    LeaveApprovedView,
    LeaveRejectView,
    LoginView,
    LogoutView
)

urlpatterns=[

    # Auth
    path('auth/login/',LoginView.as_view(),name='login'),
    path('auth/logout/',LogoutView.as_view(),name='logout'),

    # Leaves
    # 1-Get All Leave plus new Approved Leave
    path('leaves/',LeaveListView.as_view(),name='leave-list'),

    # 2-Single Leave - Get, Approve, Reject, Delete  
    path('leaves/<int:leave_id>/',LeaveDetailView.as_view(),name='leave-detail'),

    # 3-Leave Approved
    path('leaves/<int:leave_id>/approve/',LeaveApprovedView.as_view(),name='leave-approve'),

    # 4-Leave Reject
    path('leaves/<int:leave_id>/reject/',LeaveRejectView.as_view(),name='leave-reject'),
]
