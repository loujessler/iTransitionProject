from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from collect.api.mixins.collection_mixins import CollectionsMixin
from collect.api.mixins.item_mixins import LatestItemsMixin
from collect.api.mixins.tag_mixins import TagsMixin
from collect.api.serializers import ItemSerializer, CollectionSerializer, TagSerializer


class MainPageAPIView(APIView, LatestItemsMixin, CollectionsMixin, TagsMixin):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        latest_items = self.latest_items()
        top_collections = self.top_collections()
        tags = self.tags()

        latest_items_serializer = ItemSerializer(latest_items, many=True)
        top_collections_serializer = CollectionSerializer(top_collections, many=True)
        tags_serializer = TagSerializer(tags, many=True)

        return Response({
            'latest_items': latest_items_serializer.data,
            'top_collections': top_collections_serializer.data,
            'tags': tags_serializer.data
        })
