from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views.tag_views import TagListView
from .views.item_views import ItemListView, LatestItems
from .views.collection_views import CollectionView, TopCollectionView

from .views.auth_views import LoginView, LogoutView, RegisterUserView
from .views.main_views import ItemListCreateAPIView, ItemRetrieveUpdateDestroyAPIView
from .views.main_page_views import MainPageAPIView


urlpatterns = [
    path('main-page/',
         MainPageAPIView.as_view(), name='api-main-page'),
    path('latest-items/',
         LatestItems.as_view(), name='latest-items'),
    path('top-collections/',
         TopCollectionView.as_view(), name='top-collections'),
    path('tags/',
         TagListView.as_view(), name='top-collections'),

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
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
