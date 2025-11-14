import React, { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify"

// import { io } from 'socket.io-client'

// Material-UI Icons (simulated)
const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const ErrorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
)

const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
)

const MessageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
  </svg>
)

// Mock Socket.IO
class MockSocket {
  constructor(url) {
    this.url = url
    this.connected = false
    this.listeners = {}
    this.id = "mock_" + Math.random().toString(36).substr(2, 9)
    setTimeout(() => this.connect(), 1000)
  }

  connect() {
    this.connected = true
    this.emit("connect")
  }

  on(event, callback) {
    console.log("callback", callback)
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data))
    }

    if (event === "send-message" && this.connected) {
      setTimeout(() => {
        this.emit("receive-message", {
          text: `Echo: ${data.text}`,
          user: "Server",
          timestamp: Date.now(),
        })
      }, 800)
    }
  }

  off(event) {
    if (this.listeners[event]) {
      delete this.listeners[event]
    }
  }

  disconnect() {
    this.connected = false
    this.emit("disconnect")
  }
}

export default function SocketIODemo() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef(null)

  useEffect(() => {
    // Real implementation:
    // import { io } from 'socket.io-client'
    // const socket = io('http://localhost:3001')

    const socket = new MockSocket("http://localhost:3001")
    socketRef.current = socket

    // Connection events
    socket.on("connect", () => {
      console.log("Connected:", socket.id)
      setIsConnected(true)
      toast.success("Connected to server!", {
        icon: CheckCircleIcon,
      })
    })

    socket.on("disconnect", () => {
      console.log("Disconnected")
      setIsConnected(false)
      toast.error("Disconnected from server", {
        icon: ErrorIcon,
      })
    })

    // Listen for incoming messages and show toast
    socket.on("receive_msg", (data) => {
      console.log("Message received:", data)

      // Add message to chat
      const newMessage = {
        id: Date.now() + Math.random(),
        text: data.text,
        user: data.user || "Server",
        timestamp: new Date().toLocaleTimeString(),
        type: "received",
      }
      setMessages((prev) => [...prev, newMessage])

      // Show toast notification
      toast.info(`New message from ${data.user || "Server"}: ${data.text}`, {
        icon: MessageIcon,
        autoClose: 4000,
      })
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("receive-message")
      socket.disconnect()
      // socket.close()
    }
  }, [])

  const sendMessage = () => {
    if (!inputMessage.trim() || !isConnected) return

    const messageData = {
      text: inputMessage,
      user: "You",
      timestamp: Date.now(),
    }

    // Send message via Socket.IO
    socketRef.current.emit("send-message", messageData)

    // Add to local messages
    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      user: "You",
      timestamp: new Date().toLocaleTimeString(),
      type: "sent",
    }
    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(400px)
            opacity: 0
          }
          to {
            transform: translateX(0)
            opacity: 1
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Header */}

        {/* Messages Area */}
        <div className="bg-slate-800/50 backdrop-blur-sm h-[450px] overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <MessageIcon />
                <p className="text-lg mt-4 mb-2">No messages yet</p>
                <p className="text-sm">
                  Send a message to see toast notifications!
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === "sent" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    msg.type === "sent"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-white"
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">{msg.user}</div>
                  <div className="break-words">{msg.text}</div>
                  <div className="text-xs opacity-70 mt-1">{msg.timestamp}</div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Input Area */}
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-b-2xl p-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isConnected ? "Type a message..." : "Waiting for connection..."
              }
              disabled={!isConnected}
              className="flex-1 bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={sendMessage}
              disabled={!isConnected || !inputMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <SendIcon />
              Send
            </button>
          </div>
          <p className="text-slate-500 text-xs mt-3">
            Press Enter to send • Toast appears when message received
          </p>
        </div>
      </div>

      {/* Code Example */}
      <div className="max-w-4xl mx-auto mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-3">
          📝 Real Implementation Code
        </h3>
        <div className="bg-slate-900/80 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
          <pre>{`import { io } from 'socket.io-client'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const socket = io('http://localhost:3001')

// Listen for messages and show toast
socket.on('receive-message', (data) => {
  toast.info(\`New message: \${data.text}\`)
})`}</pre>
        </div>
      </div>
    </div>
  )
}
