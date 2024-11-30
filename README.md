# WebSocket Chat Server

A simple WebSocket server written in Go that handles real-time chat functionality. Designed to work with a Next.js application.

## Features

- Real-time messaging using WebSockets
- Support for multiple chat rooms
- Message broadcasting
- Connection logging

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

Where `{room-name}` can be:
- `lobby` for main chat
- `game-{id}` for game rooms

## Example Client Connection

```javascript
const ws = new WebSocket(`ws://localhost:8080/chat?room=lobby`);

ws.onmessage = (event) => {
  console.log('Received:', event.data);
};

ws.send("Hello!");
```
