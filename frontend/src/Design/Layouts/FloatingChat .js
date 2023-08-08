import React, { useState, useEffect, useRef } from 'react';

const FloatingChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'user',
      content: 'Give me your company name',
    },
    {
      role: 'assistant',
      content: 'Hello! This is Company Support. How can I assist you?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const chatContainerRef = useRef(null); // Ref to the chat container element

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSend = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        role: 'user',
        content: inputMessage,
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container when a new message is added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="floating-chat-container">
      <div
        className={`floating-icon ${isChatOpen ? 'open' : ''}`}
        onClick={toggleChat}
      >
        <span>💬</span>
      </div>
      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Chat Window</span>
            <button className="close-button" onClick={toggleChat}>
              Close
            </button>
          </div>
          <div className="chat-messages" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'user' : 'assistant'}`}
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
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;
