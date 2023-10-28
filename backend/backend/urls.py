from django.urls import include

from django.contrib import admin
from django.urls import path

from collect.views import items_view, item_add_view

urlpatterns = [
    path('admin/collect/collection/<int:collection_id>/', items_view, name='items_view'),
    path('admin/collect/item/add/', item_add_view, name='collect_item_add'),
    path('admin/', admin.site.urls),
]
