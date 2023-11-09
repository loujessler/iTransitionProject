from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from collect.views import items_view, item_add_view, item_change_view, item_delete_view


urlpatterns = [
    path('admin/collect/collection/<int:collection_id>/', items_view, name='items_view'),
    path('admin/collect/item/add/', item_add_view, name='collect_item_add'),
    path('admin/collect/item/change/<int:item_id>/', item_change_view, name='collect_item_change'),
    path('item/delete/<int:item_id>/', item_delete_view, name='collect_item_delete'),

    path('admin/', admin.site.urls),
    path('api/', include('collect.api.urls.api_urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
