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
        super().clean()
        existing_counts = ExtraField.objects.filter(collection=self.collection).values('field_type').annotate(
            count=models.Count('field_type'))
        current_count = next(
            (count['count'] for count in existing_counts if count['field_type'] == self.field_type), 0)
        if current_count >= 3:
            raise ValidationError(f'You can only add 3 fields of type {self.field_type}.')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class Item(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.title


class ExtraFieldValue(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='extra_field_values')
    extra_field = models.ForeignKey(ExtraField, on_delete=models.CASCADE)
    value = models.TextField()

    def __str__(self):
        return f"{self.extra_field.name}: {self.value}"
