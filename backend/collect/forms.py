from django import forms
from .models import Item, ExtraField, ExtraFieldValue, Collection


class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = '__all__'
        exclude = ['extra_field_values']

    def __init__(self, *args, **kwargs):
        super(ItemForm, self).__init__(*args, **kwargs)
        collection_id = self.data.get('collection') or self.initial.get('collection')
        print(f'collection_id: {collection_id}')
        self.fields['collection'] = forms.ModelChoiceField(
            queryset=Collection.objects.all(),
            widget=forms.HiddenInput(),
            initial=collection_id
        )

        if collection_id:
            extra_fields = ExtraField.objects.filter(collection_id=collection_id)

            for ef in extra_fields:
                field_name = f'extrafield_{ef.pk}'
                field_type = ef.field_type

                initial_value = None
                if self.instance.id:
                    try:
                        efv = ExtraFieldValue.objects.get(item=self.instance, extra_field=ef)
                        initial_value = efv.value
                    except ExtraFieldValue.DoesNotExist:
                        pass

                if field_type == 'int':
                    self.fields[field_name] = forms.IntegerField(label=ef.name, required=False, initial=initial_value)
                elif field_type == 'str':
                    self.fields[field_name] = forms.CharField(label=ef.name, required=False, initial=initial_value)
                elif field_type == 'text':
                    self.fields[field_name] = forms.CharField(widget=forms.Textarea(attrs={'rows': 5, 'cols': 20}),
                                                              label=ef.name, required=False, initial=initial_value)
                elif field_type == 'bool':
                    self.fields[field_name] = forms.BooleanField(label=ef.name, required=False,
                                                                 initial=bool(initial_value))
                elif field_type == 'date':
                    self.fields[field_name] = forms.DateField(label=ef.name, required=False, initial=initial_value)

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
