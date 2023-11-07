from collect.models import Tag


class TagsMixin:
    tag = Tag.objects

    def tags(self):
        return self.tag.all()
