from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse

from collect.api.mixins.collection_mixins import CollectionsMixin
from collect.api.serializers import CollectionSerializer
from collect.models import Collection


class CollectionView(APIView, CollectionsMixin):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        try:
            collection = self.collection_by_id(pk)
        except Collection.DoesNotExist:
            return Response({"error": "Collection not found"}, status=404)

        serializer = CollectionSerializer(collection)
        return Response(serializer.data)


class CollectionListView(APIView, CollectionsMixin):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        collections = self.collections()
        serializer = CollectionSerializer(collections, many=True)
        return Response(serializer.data)


class TopCollectionView(APIView, CollectionsMixin):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        top_collections = self.top_collections()
        serializer = CollectionSerializer(top_collections, many=True)
        return Response(serializer.data)