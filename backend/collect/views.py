from django.shortcuts import render, get_object_or_404, redirect
from .forms import ItemForm
from .models import Collection, Item, ExtraField, ExtraFieldValue


def items_view(request, collection_id):
    items = Item.objects.select_related('collection').filter(collection_id=collection_id)
    return render(request, 'admin/items_view.html', {
        'collection': items[0].collection if items else None,
        'items': items,
    })


def item_add_view(request):
    if request.method == "POST":
        form = ItemForm(request.POST)
        if form.is_valid():
            item = form.save(commit=False)
            item.save()

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


def item_change_view(request, item_id):
    item = get_object_or_404(Item, pk=item_id)

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

    return render(request, 'admin/item_edit.html', context)


def item_delete_view(request, item_id):
    item = get_object_or_404(Item, id=item_id)
    collection_id = item.collection.id

    ExtraFieldValue.objects.filter(item=item).delete()

    item.delete()

    return redirect('items_view', collection_id=collection_id)
