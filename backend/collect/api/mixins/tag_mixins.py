from collect.models import Tag


class TagsMixin:
    def get_tags(self):
        return Tag.objects.all()
