from collect.models import Item


class LatestItemsMixin:
    item = Item.objects

    def get_latest_items(self):
        return self.item.all().order_by('-created_date')[:5]
