from django.shortcuts import render, get_object_or_404, redirect
from .forms import ItemForm
from .models import Collection, Item, ExtraField, ExtraFieldValue

from django.urls import reverse
from django.shortcuts import render, redirect


def items_view(request, collection_id):
    collection = get_object_or_404(Collection, id=collection_id)
    items = Item.objects.filter(collection=collection)
    return render(request, 'admin/items_view.html', {
        'collection': collection,
        'items': items,
    })


def item_add_view(request):
    if request.method == "POST":
        form = ItemForm(request.POST)
        if form.is_valid():
            # Сохраняем основные поля айтема
            item = form.save(commit=False)
            item.save()

            # Теперь обрабатываем дополнительные поля
            collection_id = form.cleaned_data.get('collection').id
            extra_fields = ExtraField.objects.filter(collection_id=collection_id)

            for ef in extra_fields:
                field_name = f'extrafield_{ef.pk}'
                if field_name in form.cleaned_data:
                    ExtraFieldValue.objects.update_or_create(
                        item=item,
                        extra_field=ef,
                        defaults={'value': form.cleaned_data[field_name]}
                    )
            return redirect('items_view', collection_id=item.collection.id)
    else:
        collection_id = request.GET.get('collection')
        form = ItemForm(initial={'collection': collection_id})

    collection = get_object_or_404(Collection, id=collection_id)
    return render(request, 'admin/item_add.html', {
        'form': form,
        'collection': collection,
    })


def item_change_view(request, object_id):
    item = get_object_or_404(Item, pk=object_id)

    if request.method == 'POST':
        form = ItemForm(request.POST, instance=item)
        if form.is_valid():
            form.save()
            return redirect('items_view', collection_id=item.collection.id)

    else:
        form = ItemForm(instance=item)

    context = {
        'form': form,
        'collection': item.collection,
        'item': item,
    }

    return render(request, 'admin/item_edit.html', context)  # Обновите путь к вашему шаблону изменений


# def change_view(self, request, object_id, form_url='', extra_context=None):
#     if not self.has_change_permission(request, None):
#         raise PermissionDenied
#
#     item = Item.objects.get(pk=object_id)
#
#     # Если совершается POST-запрос, обработайте данные и перенаправьте на список объектов
#     if request.method == 'POST':
#         form = ItemForm(request.POST, instance=item)
#         if form.is_valid():
#             form.save()
#             return redirect(reverse('admin:collect_item_changelist'))
#
#     # Если GET-запрос, отобразите ваш шаблон изменений
#     else:
#         form = ItemForm(instance=item)
#
#     context = {
#         'form': form,
#         'collection': item.collection,
#         'items': Item.objects.filter(collection=item.collection),
#     }
#
#     if extra_context:
#         context.update(extra_context)
#
#     return render(request, 'path_to_your_template.html', context)
