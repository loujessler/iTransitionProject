from django.urls import path
from backend.urls import include
from django.conf import settings
from django.conf.urls.static import static

from collect.api.views.tag_views import TagListView
from collect.api.views.item_views import LatestItems
from collect.api.views.collection_views import TopCollectionView

from collect.api.views.auth_views import LoginView, LogoutView, RegisterUserView
from collect.api.views.main_page_views import MainPageAPIView


urlpatterns = [
    path('main-page/',
         MainPageAPIView.as_view(), name='api-main-page'),
    path('latest-items/',
         LatestItems.as_view(), name='latest-items'),
    path('top-collections/',
         TopCollectionView.as_view(), name='top-collections'),
    path('tags/',
         TagListView.as_view(), name='top-collections'),

    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('exist_username/', RegisterUserView.exist_username, name='exist_username'),

    path('collection/', include('collect.api.urls.collection_urls')),
    path('user/', include('collect.api.urls.user_urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
