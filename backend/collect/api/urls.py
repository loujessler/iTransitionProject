from django.urls import path

from .views.auth_views import LoginView, LogoutView, RegisterUserView
from .views.collection_views import CollectionView
from .views.main_views import ItemListCreateAPIView, ItemRetrieveUpdateDestroyAPIView
from .views.main_page_views import MainPageAPIView


urlpatterns = [
    path('main-page/',
         MainPageAPIView.as_view(), name='api-main-page'),

    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('exist_username/', RegisterUserView.exist_username, name='exist_username'),

    path('collection/<int:pk>/',
         CollectionView.as_view(), name='api-collection'),
    path('collection/<int:collection_id>/items/',
         ItemListCreateAPIView.as_view(), name='api-item-list-create'),
    path('collection/<int:collection_id>/items/<int:pk>/',
         ItemRetrieveUpdateDestroyAPIView.as_view(), name='api-item-detail'),
]
