from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from ..mixins.user_mixins import UserMixin
from ..serializers import UserSerializer, ProfileSerializer
from ...models import Profile


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_profile(request):
    user = request.user
    profile, created = Profile.objects.get_or_create(user=user)  # Создаем профиль, если его нет

    profile_serializer = ProfileSerializer(profile, context={'request': request})
    user_serializer = UserSerializer(user, context={'request': request})

    response_data = user_serializer.data
    response_data['profile'] = profile_serializer.data

    return Response(response_data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_collections(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserDataView(APIView, UserMixin):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk, format=None):
        user = self.user_by_id(pk)
        if not user:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserEditDataView(APIView, UserMixin):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        print(request.data)
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegistrateUserView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
