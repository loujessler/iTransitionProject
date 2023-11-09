from django.urls import path

from collect.api.views.collection_views import UserCollectionsView
from collect.api.views.users_views import UserDataView, user_profile


urlpatterns = [
    path('<int:pk>/', UserDataView.as_view(), name='api-user-detail'),
    path('profile/', user_profile, name='api-user-profile'),
    path('<int:user_id>/collections/', UserCollectionsView.as_view(), name='api-user-collections'),
]
