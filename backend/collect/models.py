from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Collection(models.Model):
    THEME_CHOICES = [
        ('Books', 'Books'),
        ('Signs', 'Signs'),
        ('Silverware', 'Silverware'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    theme = models.CharField(max_length=50, choices=THEME_CHOICES)
    image = models.ImageField(upload_to='collections/', blank=True, null=True)

    def __str__(self):
        return self.name


class ExtraField(models.Model):
    FIELD_TYPES = (
        ('int', 'Integer'),
        ('str', 'String'),
        ('text', 'Text'),
        ('bool', 'Boolean'),
        ('date', 'Date'),
    )

    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name='extra_fields')
    name = models.CharField(max_length=100)
    field_type = models.CharField(max_length=10, choices=FIELD_TYPES)

    def __str__(self):
        return self.name

    def clean(self):
        # Получаем количество каждого типа поля
        existing_fields = ExtraField.objects.filter(collection=self.collection)
        counts = {
            'int': existing_fields.filter(field_type='int').count(),
            'str': existing_fields.filter(field_type='str').count(),
            'text': existing_fields.filter(field_type='text').count(),
            'bool': existing_fields.filter(field_type='bool').count(),
            'date': existing_fields.filter(field_type='date').count(),
        }

        # Проверяем, не превышает ли лимит для данного типа поля
        if counts[self.field_type] >= 3:
            raise ValidationError(f'You can only add 3 fields of type {self.field_type}.')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class Item(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    tags = models.ManyToManyField(Tag, blank=True)
    # extra_data = models.JSONField(default=dict)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        for field_name, value in self.extra_data.items():
            extra_field = ExtraField.objects.get(name=field_name, collection=self.collection)
            ExtraFieldValue.objects.update_or_create(
                item=self,
                extra_field=extra_field,
                defaults={'value': value}
            )


class ExtraFieldValue(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='extra_field_values')
    extra_field = models.ForeignKey(ExtraField, on_delete=models.CASCADE)
    value = models.TextField()  # используется для хранения значений всех типов полей

    def __str__(self):
        return f"{self.extra_field.name}: {self.value}"