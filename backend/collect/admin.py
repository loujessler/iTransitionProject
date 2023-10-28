from django.contrib import admin

from .models import Collection, Item, Tag, ExtraField, ExtraFieldValue


class ExtraFieldValueInline(admin.TabularInline):
    model = ExtraFieldValue
    extra = 0

    def get_formset(self, request, obj=None, **kwargs):
        # Это предполагает, что у вашей модели ExtraFieldValue есть ForeignKey 'extra_field' к модели ExtraField.
        if obj:
            self.fields = ['extra_field', 'value']
            self.max_num = obj.collection.extra_fields.count()
        return super().get_formset(request, obj, **kwargs)


class ExtraFieldInline(admin.TabularInline):
    model = ExtraField
    extra = 4
    max_num = 15


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    inlines = [ExtraFieldInline]
    list_display = ('title', 'user', 'theme')
    list_filter = ('theme', 'user')
    search_fields = ('title', 'description')
    raw_id_fields = ('user',)

    # class Media:
    #     js = ('js/admin_extra_fields.js',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    inlines = [ExtraFieldValueInline]
    list_display = ('title', 'collection')
    list_filter = ('collection',)
    search_fields = ('title', 'data')
    raw_id_fields = ('collection',)
