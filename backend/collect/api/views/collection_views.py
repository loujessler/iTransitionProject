from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse

from collect.api.mixins.collection_mixins import CollectionsMixin
from collect.api.serializers import CollectionSerializer
from collect.models import Collection


class CollectionView(APIView, CollectionsMixin):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        collections = self.collections()
        serializer = CollectionSerializer(collections, many=True)
        return Response(serializer.data)


class CollectionIdView(APIView, CollectionsMixin):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        try:
            collection = self.collection_by_id(pk)
        except Collection.DoesNotExist:
            return Response({"error": "Collection not found"}, status=404)

        serializer = CollectionSerializer(collection)
        return Response(serializer.data)


class TopCollectionView(APIView, CollectionsMixin):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        top_collections = self.top_collections()
        serializer = CollectionSerializer(top_collections, many=True)
        return Response(serializer.data)


class UserCollectionsView(APIView, CollectionsMixin):
    permission_classes = [permissions.IsAuthenticated]

    # def get(self, request, user_id):
    #     collections = self.collections_by_user_id(user_id)
    #     serializer = CollectionSerializer(collections, many=True)
    #     return Response(serializer.data)
    def get(self, request, user_id):
        page = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', 10)
        sort_by = request.query_params.get('sort', 'name')

        try:
            page = int(page)
            page_size = int(page_size)
        except ValueError:
            page = 1
            page_size = 6

        collections, total_pages = self.paginate_and_sort_collections_by_user_id(user_id, sort_by, page, page_size)

        serializer = CollectionSerializer(collections, many=True)
        return Response({
            'collections': serializer.data,
            'total_pages': total_pages
        })
