import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const FloatingChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    // {
    //   role: 'user',
    //   content: 'Give me your company name',
    // },
    {
      role: "assistant",
      content: "Hello! This is Company Support. How can I assist you?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const chatContainerRef = useRef(null); // Ref to the chat container element

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };
  const e = {
    role: "system",
    content:
      "A soap product called Lux from ABC Software company. It have 2 charactors of fast response and  multi language supporting. And having other products called hsm shampoo. It is having features like fast delivery of products.Say you dont know if it request more data than requested.and dont any request data from the user.",
  };
  const handleSend = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        role: "user",
        content: inputMessage,
      };
      const r = [e, ...messages, newMessage];
      setMessages([...messages, newMessage]);
      setInputMessage("");
      console.log(r);

      const queryParams = {
        chat: r,
      };

      axios
        .get("http://localhost:3001/chat2", { params: queryParams })
        .then((response) => {
          console.log(response.data);
          setMessages([...messages, newMessage, response.data]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="floating-chat-container">
      <div
        className={`floating-icon ${isChatOpen ? "open" : ""}`}
        onClick={toggleChat}
      >
        <span>💬</span>
      </div>
      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span> Product Chat Window</span>
            <button className="close-button" onClick={toggleChat}>
              Close
            </button>
          </div>
          <div className="chat-messages" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.role === "user" ? "user" : "assistant"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={handleInputChange}
            />
            <button
              onClick={() => {
                handleSend();
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;
