from django.shortcuts import render, get_object_or_404, redirect
from .forms import ItemForm
from .models import Collection, Item, ExtraField, ExtraFieldValue


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
