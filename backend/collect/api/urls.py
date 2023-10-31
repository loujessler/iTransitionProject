from django.urls import path
from .views import ItemListCreateAPIView, ItemRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('collection/<int:collection_id>/items/', ItemListCreateAPIView.as_view(), name='api-item-list-create'),
    path('collection/<int:collection_id>/items/<int:pk>/', ItemRetrieveUpdateDestroyAPIView.as_view(), name='api-item-detail'),
]
