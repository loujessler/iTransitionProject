from rest_framework import generics, permissions

from ..models import Collection, Item
from .serializers import ItemSerializer


class ItemListCreateAPIView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Item.objects.filter(collection_id=self.kwargs['collection_id'])

    def perform_create(self, serializer):
        serializer.save()


class ItemRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Item.objects.filter(collection_id=self.kwargs['collection_id'])
