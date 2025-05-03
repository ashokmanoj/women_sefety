import React, { useState } from "react";
import { MessageCircleMore, Send, X } from "lucide-react";
import { generateSafetyResponse } from "../services/gemini";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userMessage = { sender: "You", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");

    const aiText = await generateSafetyResponse(prompt);
    setMessages((prev) => [...prev, { sender: "AI", text: aiText }]);
  };

  return (
    <>
      <div
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "200px",
          right: "20px",
          width: "70px",
          height: "70px",
          backgroundColor: "#ef67d8",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <MessageCircleMore />
      </div>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "380px",
            height: "500px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "10px",
              textAlign: "center",
              fontWeight: "bold",
              position: "relative",
            }}
          >
            safeGuard chat
            <span
              onClick={toggleChat}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                cursor: "pointer",
              }}
            >
              <X />
            </span>
          </div>

          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              backgroundColor: "#f8f9fa",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "You" ? "right" : "left",
                  marginBottom: "10px",
                }}
              >
                <p
                  style={{
                    display: "inline-block",
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: msg.sender === "You" ? "#d1ecf1" : "#e2e3e5",
                    margin: "5px 0",
                  }}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: "10px",
                padding: "8px 12px",
                backgroundColor: "deeppink",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <Send />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
