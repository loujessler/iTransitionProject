from rest_framework import serializers

from ..models import Item, Collection, ExtraFieldValue, ExtraField


class ExtraFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtraField
        fields = ('name', 'field_type')


class ExtraFieldValueSerializer(serializers.ModelSerializer):
    details = ExtraFieldSerializer(source='extra_field', read_only=True)

    class Meta:
        model = ExtraFieldValue
        fields = ('value', 'details')


class ItemSerializer(serializers.ModelSerializer):
    extra_fields = ExtraFieldValueSerializer(source='extra_field_values', many=True, read_only=True)

    class Meta:
        model = Item
        fields = '__all__'
        extra_fields = ['extra_fields']

    def get_extra_fields(self, obj):
        # Получаем все связанные с объектом ExtraFieldValue
        extra_field_values = ExtraFieldValue.objects.filter(item=obj)
        # Сериализуем их с помощью ExtraFieldSerializer
        return ExtraFieldSerializer(extra_field_values, many=True).data


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'
