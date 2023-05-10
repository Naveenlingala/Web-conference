from channels.generic.websocket import AsyncWebsocketConsumer

class VideoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Accept the connection call
        print('Websocket connected')
        await self.accept()

    async def receive(self, text_data=None):
        # Send the recieved data to frontend
        await self.send(text_data)

    async def disconnect(self, close_code):
        # Called when the socket closes
        print('Websocket Disconnected')
        await self.close(close_code)