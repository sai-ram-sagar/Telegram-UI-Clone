import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatItem from '../ChatItem/ChatItem';
import './ChatList.css';

const ChatList = ({ isDarkMode, onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1')
      .then(response => {
        setChats(response.data.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading chats: {error.message}</p>;

  return (
    <div className={`chat-list ${isDarkMode ? 'dark' : ''}`}>
      {chats.map(chat => (
        <ChatItem key={chat.id} chat={chat} isDarkMode={isDarkMode} onSelectChat={onSelectChat} />
      ))}
    </div>
  );
};

export default ChatList;
