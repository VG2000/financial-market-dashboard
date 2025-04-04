from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import marketdata.routing

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(marketdata.routing.websocket_urlpatterns)
})
