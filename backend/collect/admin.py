from django.contrib import admin, auth
from django.urls import reverse
from django.utils.html import format_html

from .forms import ItemForm
from .models import Collection, Item, ExtraFieldValue, ExtraField, Tag, Profile
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

admin.site.register(Profile)


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


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass


admin.site.unregister(User)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff')
