from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from collect.api.mixins.item_mixins import LatestItemsMixin
from collect.api.serializers import ItemSerializer


class ItemListView(APIView, LatestItemsMixin):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        items = self.get_latest_items()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)
