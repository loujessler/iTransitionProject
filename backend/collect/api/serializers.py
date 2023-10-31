from rest_framework import serializers

from ..models import Item, Collection, ExtraFieldValue, ExtraField, Tag, User


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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


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
