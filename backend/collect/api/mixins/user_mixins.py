from django.contrib.auth.models import User
from django.http import Http404

from collect.models import Profile


class UserMixin:
    user = User.objects

    def user_by_id(self, pk):
        try:
            return self.user.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def users(self):
        return self.user.all()
