from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from ..mixins.user_mixins import UserMixin
from ..serializers import UserSerializer
from django.contrib.auth.models import User


class UserDataView(APIView, UserMixin):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk, format=None):
        user = self.user_by_id(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class RegistrateUserView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
