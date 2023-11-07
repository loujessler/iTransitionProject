from django.db.models import Count

from collect.models import Collection


class CollectionsMixin:
    collection = Collection.objects

    def collection_by_id(self, pk):
        return self.collection.get(pk=pk)

    def collections(self):
        return self.collection.all()

    def top_collections(self):
        return self.collection.annotate(num_items=Count('item')).order_by('-num_items')[:5]
