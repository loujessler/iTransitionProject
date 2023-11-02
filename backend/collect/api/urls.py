from django.urls import path

from collect.api.views.collection_views import CollectionView
from collect.api.views.views import ItemListCreateAPIView, ItemRetrieveUpdateDestroyAPIView
from collect.api.views.main_page_views import MainPageAPIView


urlpatterns = [
    path('main-page/',
         MainPageAPIView.as_view(), name='api-main-page'),

    path('collection/<int:pk>/',
         CollectionView.as_view(), name='api-collection'),
    path('collection/<int:collection_id>/items/',
         ItemListCreateAPIView.as_view(), name='api-item-list-create'),
    path('collection/<int:collection_id>/items/<int:pk>/',
         ItemRetrieveUpdateDestroyAPIView.as_view(), name='api-item-detail'),
]
