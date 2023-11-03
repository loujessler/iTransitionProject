import json

from django.http import HttpResponse
from django.contrib.auth import authenticate

from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)

            response = HttpResponse()
            response['Content-Type'] = 'application/json'
            response.set_cookie(
                'authToken',
                token.key,
                max_age=86400,
                # TODO Проверка безопасного протокола HTTPS
                # secure=True,
                httponly=True,
                samesite='Strict'
            )
            response.content = json.dumps({'token': token.key})
            response.status_code = status.HTTP_200_OK

            return response

        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        request.user.auth_token.delete()

        response = HttpResponse()
        response['Content-Type'] = 'application/json'
        response.set_cookie('authToken', '', max_age=0)
        response.content = json.dumps({'message': 'Successfully logged out'})
        response.status_code = status.HTTP_200_OK

        return response

