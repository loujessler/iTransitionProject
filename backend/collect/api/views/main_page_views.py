from django.db.models import Count
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from collect.api.serializers import ItemSerializer, CollectionSerializer, TagSerializer
from collect.models import Item, Collection, Tag


class MainPageAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):

        # Список последних добавленных айтемов
        latest_items = Item.objects.all().order_by('-created_date')[:5]  # предполагая, что у вас есть поле created_date
        latest_items_serializer = ItemSerializer(latest_items, many=True)

        # Список 5 самых больших коллекций
        top_collections = Collection.objects.annotate(num_items=Count('item')).order_by('-num_items')[:5]
        top_collections_serializer = CollectionSerializer(top_collections, many=True)

        # Облако тэгов
        tags = Tag.objects.all()
        tags_serializer = TagSerializer(tags, many=True)

        return Response({
            'latest_items': latest_items_serializer.data,
            'top_collections': top_collections_serializer.data,
            'tags': tags_serializer.data
        })
