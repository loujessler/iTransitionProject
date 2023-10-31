from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html

from .forms import ItemForm
from .models import Collection, Item, ExtraFieldValue, ExtraField


class ExtraFieldValueInline(admin.TabularInline):
    model = ExtraFieldValue
    extra = 0
    fields = ['extra_field', 'value']

    def get_formset(self, request, obj=None, **kwargs):
        if obj:
            self.max_num = obj.collection.extra_fields.count()
        return super().get_formset(request, obj, **kwargs)


class ExtraFieldInline(admin.TabularInline):
    model = ExtraField
    extra = 0
    max_num = 15


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    inlines = [ExtraFieldInline]
    list_display = ['id', 'title', 'user', 'theme', 'view_items']
    list_filter = ('theme', 'user')
    search_fields = ('title', 'description')
    raw_id_fields = ('user',)

    def view_items(self, obj):
        url = reverse('items_view', args=[obj.id])
        return format_html('<a href="{}">Просмотреть айтемы</a>', url)

    view_items.short_description = 'Действия'


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    form = ItemForm
    list_display = ('title', 'collection')
    list_filter = ('collection',)
    search_fields = ('title',)
    raw_id_fields = ('collection',)
    exclude_from_admin = True

    def has_module_permission(self, request):
        return False

    # def add_view(self, request, form_url='', extra_context=None):
    #     extra_context = extra_context or {}
    #     # collection_id = request.GET.get('collection')
    #     # if collection_id:
    #     #     extra_context['collection'] = collection_id
    #     return super(ItemAdmin, self).add_view(request, form_url, extra_context)

    # def get_form(self, request, obj=None, **kwargs):
    #     form = super(ItemAdmin, self).get_form(request, obj, **kwargs)
    #     # collection_id = request.GET.get('collection')
    #     # if collection_id:
    #     #     form.base_fields['collection'].initial = collection_id
    #     return form

    # def formfield_for_foreignkey(self, db_field, request, **kwargs):
    #     if db_field.name == "extra_field":
    #         collection_id = request.GET.get('collection')
    #         if collection_id:
    #             kwargs["queryset"] = ExtraField.objects.filter(collection_id=collection_id)
    #     return super().formfield_for_foreignkey(db_field, request, **kwargs)
