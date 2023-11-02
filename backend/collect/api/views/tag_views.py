from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from collect.api.mixins.tag_mixins import TagsMixin
from collect.api.serializers import TagSerializer


class TagListView(APIView, TagsMixin):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        tags = self.get_tags()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)
