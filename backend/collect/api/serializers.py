from rest_framework import serializers

from ..models import Item, Collection, ExtraFieldValue, ExtraField, Tag, Profile
from django.contrib.auth.models import User


class ExtraFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtraField
        fields = ('name', 'field_type')


class ExtraFieldValueSerializer(serializers.ModelSerializer):
    details = ExtraFieldSerializer(source='extra_field', read_only=True)

    class Meta:
        model = ExtraFieldValue
        fields = ('value', 'details')


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'profile', 'username', 'first_name', 'last_name', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    @staticmethod
    def exist_username(username):
        return User.objects.filter(username__iexact=username).exists()

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        print('instance: ', instance)
        print('validated_data: ', validated_data)
        profile_data = validated_data.pop('profile', {})
        profile = instance.profile

        # Обновление полей пользователя
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)

        instance.save()

        # Обновление связанного профиля, если есть данные
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()

        return instance


class ItemSerializer(serializers.ModelSerializer):
    extra_fields = ExtraFieldValueSerializer(source='extra_field_values', many=True, read_only=True)
    collection = CollectionSerializer()
    user = UserSerializer(source='collection.user')

    class Meta:
        model = Item
        fields = '__all__'
        extra_fields = ['extra_fields', 'user']

    def get_extra_fields(self, obj):
        extra_field_values = ExtraFieldValue.objects.filter(item=obj)
        return ExtraFieldSerializer(extra_field_values, many=True).data
