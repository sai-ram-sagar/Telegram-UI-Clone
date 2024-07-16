import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow/ChatWindow';
import './App.css';
import Sidebar from './components/SideBar/SideBar';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onSelectChat={handleSelectChat} />
      <ChatWindow isDarkMode={isDarkMode} selectedChatId={selectedChatId} />
    </div>
  );
}

export default App;
