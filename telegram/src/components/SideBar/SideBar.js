import React from 'react';
import './SideBar.css';
import Header from '../Header/Header';
import ChatList from '../ChatList/ChatList';

function Sidebar({ isDarkMode, toggleDarkMode, onSelectChat  }) {
  return (
    <div className={`sidebar ${isDarkMode ? 'dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <ChatList isDarkMode={isDarkMode} onSelectChat={onSelectChat} />
    </div>
  );
}

export default Sidebar;
 