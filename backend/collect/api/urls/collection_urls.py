from django.urls import path

from ..views.collection_views import CollectionView, CollectionIdView
from ..views.main_views import ItemListCreateAPIView, ItemRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('',
         CollectionView.as_view(), name='api-collection-all'),
    path('<int:pk>/',
         CollectionIdView.as_view(), name='api-collection'),
    path('<int:collection_id>/items/',
         ItemListCreateAPIView.as_view(), name='api-item-list-create'),
    path('<int:collection_id>/items/<int:pk>/',
         ItemRetrieveUpdateDestroyAPIView.as_view(), name='api-item-detail'),
]
