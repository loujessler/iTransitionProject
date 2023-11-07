from collect.models import Item


class LatestItemsMixin:
    item = Item.objects

    def latest_items(self):
        return self.item.all().order_by('-created_date')[:5]
