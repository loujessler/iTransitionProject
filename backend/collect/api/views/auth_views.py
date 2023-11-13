import json

from django.http import HttpResponse
from django.contrib.auth import authenticate
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from ..serializers import UserSerializer


class Auth:
    @staticmethod
    def auth_user(username, password):
        return authenticate(username=username, password=password)

    @staticmethod
    def create_token(user):
        return Token.objects.get_or_create(user=user) if user else None

    @staticmethod
    def make_response(token, code_status):
        if token:
            response = HttpResponse(
                content=json.dumps({'token': token.key}),
                content_type='application/json',
                status=code_status
            )
            response.set_cookie(
                'authToken',
                token.key,
                max_age=86400,
                httponly=True,
                samesite='Strict'
                # secure=True, # TODO: Uncomment this when using HTTPS
            )
        else:
            response = HttpResponse(
                content=json.dumps({'error': 'Invalid credentials'}),
                content_type='application/json',
                status=status.HTTP_401_UNAUTHORIZED
            )
        return response


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = Auth.auth_user(username, password)
        token, _ = Auth.create_token(user)
        return Auth.make_response(token, status.HTTP_200_OK if token else status.HTTP_401_UNAUTHORIZED)


class RegisterUserView(APIView):
    permission_classes = [permissions.AllowAny]

    @staticmethod
    def exist_username(request):
        username = request.GET.get('username', None)
        serializer = UserSerializer().exist_username(username)
        return HttpResponse(
            content=json.dumps({'existUsername': serializer}),
            content_type='application/json',
            status=status.HTTP_200_OK
        )

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            Auth.auth_user(user.username, user.password)
            token, _ = Auth.create_token(user)
            return Auth.make_response(token, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        response = HttpResponse(
            content=json.dumps({'message': 'Successfully logged out'}),
            content_type='application/json',
            status=status.HTTP_200_OK
        )
        response.delete_cookie('authToken')
        return response
