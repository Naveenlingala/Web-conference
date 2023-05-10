"""
ASGI config for webstream project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from camera_feed.routing import websocket_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "webstream.settings")

application = ProtocolTypeRouter({
        "http": get_asgi_application(),
        # Create a stack of middleware for WebSocket connections
        # Apply authentication middleware and route WebSocket requests
        'websocket': AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
})