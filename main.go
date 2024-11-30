package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Client struct {
	conn   *websocket.Conn
	userId string
	room   string // lobby or game-{id}
}

type Message struct {
	Name    string `json:"name"`
	Message string `json:"message"`
	Room    string `json:"room"` // lobby or game-{id}
}

var (
	clients   = make(map[*Client]bool)
	broadcast = make(chan Message)
)

func handleConnections(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Failed to upgrade connection: %v", err)
		return
	}
	defer conn.Close()

	room := r.URL.Query().Get("room")
	userId := r.URL.Query().Get("userId")

	client := &Client{conn: conn, userId: userId, room: room}
	clients[client] = true

	for {
		var msg Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			log.Printf("Failed to read message from client %s in room %s: %v", userId, room, err)
			return
		}
		msg.Room = client.room
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast

		for client := range clients {
			if client.room == msg.Room {
				err := client.conn.WriteJSON(msg)
				if err != nil {
					log.Printf("Failed to write message to client %s in room %s: %v", client.userId, client.room, err)
					client.conn.Close()
					delete(clients, client)
				}
			}
		}
	}
}

func main() {
	http.HandleFunc("/chat", handleConnections)
	go handleMessages()

	log.Println("Server started on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
