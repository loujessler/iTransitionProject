from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from collect.api.mixins.collection_mixins import CollectionsMixin
from collect.api.serializers import CollectionSerializer
from collect.models import Collection


class CollectionView(APIView, CollectionsMixin):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        try:
            collection = self.get_collection(pk)
        except Collection.DoesNotExist:
            return Response({"error": "Collection not found"}, status=404)

        serializer = CollectionSerializer(collection)
        return Response(serializer.data)


class CollectionListView(APIView, CollectionsMixin):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        collections = self.get_collections()
        serializer = CollectionSerializer(collections, many=True)
        return Response(serializer.data)
