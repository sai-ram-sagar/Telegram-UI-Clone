import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ChatWindow.css';
import bgLight from '../assets/bg-light.jpg';
import bgDark from '../assets/bg-dark.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const ChatWindow = ({ isDarkMode, selectedChatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedChatId) {
      setLoading(true);
      axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${selectedChatId}`)
        .then(response => {
          setMessages(response.data.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    } else {
      setMessages([]);
    }
  }, [selectedChatId]);

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const options = { month: 'long', day: 'numeric' };
      const date = new Date(message.updated_at).toLocaleString('en-US', options);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  if (error) return <p>Error loading messages: {error.message}</p>;

  const senderName = messages.length > 0 ? messages[0].sender.name : '';

  return (
    <div
      className={`chat-window ${isDarkMode ? 'dark' : ''}`}
      style={{
        backgroundImage: `url(${isDarkMode ? bgDark : bgLight})`,
      }}
    >
      {selectedChatId && (
        <>
          <div className={`chat-window-header ${isDarkMode ? 'dark' : ''}`}>
            <h3>{senderName}</h3>
            <div className='header-icons'>
              <FontAwesomeIcon className='fa-icon' icon={faPhone} />
              <FontAwesomeIcon className='fa-icon' icon={faMagnifyingGlass} />
              <FontAwesomeIcon className='fa-icon' icon={faEllipsisVertical} />
            </div>
          </div>
          <div>
            {Object.keys(groupedMessages).map(date => (
              <div key={date} className="date-group">
                <div className={`date-separator ${isDarkMode ? 'dark' : ''}`} >{date}</div>
                {groupedMessages[date].map(message => (
                  <div key={message.id} className={`message ${message.sender.name === "BeyondChat" ? 'right-side' : 'left-side'} ${isDarkMode ? 'dark' : ''}`}>
                    <p><strong>{message.sender.name}:</strong> {message.message}</p>
                    <p className="timestamp">{new Date(message.created_at).toLocaleTimeString()}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={`message-input ${isDarkMode ? 'dark' : ''}`}>
            <input
              className={`input ${isDarkMode ? 'dark' : ''}`}
              type="text" 
              placeholder="Type a message..." 
            />
            <FontAwesomeIcon className={`send-button ${isDarkMode ? 'dark' : ''}`} icon={faPaperPlane} />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
