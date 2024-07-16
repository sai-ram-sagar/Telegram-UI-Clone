import React from 'react';
import './ChatItem.css';

const ChatItem = ({ chat, isDarkMode, onSelectChat }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  const getDisplayName = (name) => {
    return name && name.trim() ? name : 'No Name';
  };

  const handleClick = () => {
    onSelectChat(chat.id);
  };

  return (
    <div className={`chat-item ${isDarkMode ? 'dark' : ''}`} onClick={handleClick}>
      <div className='left-sec'>
        <h3>{getDisplayName(chat.creator.name)}</h3>
      </div>
      <div className='right-sec'>
        <p>{formatDate(chat.updated_at)}</p>
        <p className='msg-count'>{chat.msg_count}</p>
      </div>
    </div>
  );
};
 
export default ChatItem;
