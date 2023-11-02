from django.db.models import Count

from collect.models import Collection


class CollectionsMixin:
    collection = Collection.objects

    def get_collection(self, pk):
        return self.collection.get(pk=pk)

    def get_collections(self):
        return self.collection.all()

    def get_top_collections(self):
        return self.collection.annotate(num_items=Count('item')).order_by('-num_items')[:5]
