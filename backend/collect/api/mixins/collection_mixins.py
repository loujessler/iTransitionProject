from django.db.models import Count
from django.core.paginator import Paginator

from collect.models import Collection


class CollectionsMixin:
    collection = Collection.objects

    def collection_by_id(self, pk):
        return self.collection.get(pk=pk)

    def collections(self):
        return self.collection.all()

    def top_collections(self):
        return self.collection.annotate(num_items=Count('item')).order_by('-num_items')[:5]

    # def collections_by_user_id(self, user_id):
    #     return Collection.objects.filter(user_id=user_id)

    def collections_by_user_id(self, user_id, page=1, page_size=6):
        queryset = self.collection.filter(user_id=user_id)
        paginator = Paginator(queryset, page_size)
        page_obj = paginator.get_page(page)
        return page_obj

    def paginate_collections_by_user_id(self, user_id, page=1, page_size=6):
        page_obj = self.collections_by_user_id(user_id, page, page_size)
        return page_obj.object_list, page_obj.paginator.num_pages

    def paginate_and_sort_collections_by_user_id(self, user_id, sort_by='name', page=1, page_size=6):
        if sort_by == 'name':
            queryset = self.collection.filter(user_id=user_id).order_by('title')
        elif sort_by == '-name':
            queryset = self.collection.filter(user_id=user_id).order_by('-title')
        else:
            queryset = self.collection.filter(user_id=user_id).order_by(sort_by)

        if not queryset.ordered:
            queryset = queryset.order_by('pk')

        # Создание пагинатора
        paginator = Paginator(queryset, page_size)
        page_obj = paginator.get_page(page)

        # Возвращаем данные и общее количество страниц
        return page_obj.object_list, page_obj.paginator.num_pages
