from django import forms
from .models import Item, ExtraField, ExtraFieldValue


class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = '__all__'
        exclude = ['extra_field_values']

    def __init__(self, *args, **kwargs):
        super(ItemForm, self).__init__(*args, **kwargs)
        collection_id = self.data.get('collection') or self.initial.get('collection')

        if collection_id:
            extra_fields = ExtraField.objects.filter(collection_id=collection_id)

            for ef in extra_fields:
                field_name = f'extrafield_{ef.pk}'
                field_type = ef.field_type

                if field_type == 'int':
                    self.fields[field_name] = forms.IntegerField(label=ef.name, required=False)
                elif field_type == 'str':
                    self.fields[field_name] = forms.CharField(label=ef.name, required=False)
                elif field_type == 'text':
                    self.fields[field_name] = forms.CharField(widget=forms.Textarea(attrs={'rows': 5, 'cols': 20}), label=ef.name, required=False)
                elif field_type == 'bool':
                    self.fields[field_name] = forms.BooleanField(label=ef.name, required=False)
                elif field_type == 'date':
                    self.fields[field_name] = forms.DateField(label=ef.name, required=False)

    def save(self, commit=True):
        instance = super(ItemForm, self).save(commit)
        if commit:
            collection_id = self.cleaned_data.get('collection').id
            extra_fields = ExtraField.objects.filter(collection_id=collection_id)

            for ef in extra_fields:
                field_name = f'extrafield_{ef.pk}'
                if field_name in self.cleaned_data:
                    ExtraFieldValue.objects.update_or_create(
                        item=instance,
                        extra_field=ef,
                        defaults={'value': self.cleaned_data[field_name]}
                    )
        return instance
