# WebSocket Chat Server

A simple WebSocket server written in Go that handles real-time chat functionality. Designed to work with a Next.js application.

## Features

- Real-time messaging using WebSockets
- Support for multiple chat rooms
- Message broadcasting to all clients
- Automatic connection management
- Built-in logging
- UTC timestamp for messages

## Setup

1. Install dependencies:
```bash
go mod init chat
go get github.com/gorilla/websocket
```

2. Run the server:
```bash
go run main.go
```

The server will start on `localhost:8080`

## Usage

Connect to the WebSocket server using:
```
ws://localhost:8080/chat?room={room-name}
```

The server accepts messages in JSON format with the following structure:
```json
{
  "name": "username",
  "message": "message content",
  "sentAt": "2024-01-01T12:00:00Z"  // Optional, server will set if not provided
}
```

## Example Client Implementation

```javascript
const ws = new WebSocket(`ws://localhost:8080/chat?room=lobby`);

ws.onopen = () => {
  console.log('Connected to chat server');
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received:', message);
};

// Send a message
ws.send(JSON.stringify({
  name: "User",
  message: "Hello, everyone!",
}));

ws.onclose = () => {
  console.log('Disconnected from chat server');
};
```

## Server Details

- The server automatically handles WebSocket upgrades
- All messages are broadcasted to all connected clients
- Connections are automatically cleaned up when clients disconnect
- Messages include UTC timestamps
- Server logs all connections and message activities

## Error Handling

The server includes robust error handling for:
- Connection upgrades
- Message reading/writing
- Client disconnections
- JSON parsing/formatting

## Security Note

The current implementation allows all origins (`CheckOrigin` returns true). For production use, you should implement proper origin checking based on your requirements.
