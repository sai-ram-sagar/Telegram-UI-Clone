import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Header({ isDarkMode, toggleDarkMode }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
 
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className={`header ${isDarkMode ? 'dark' : ''}`}>
      <div className='menu-icon' onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBars} size="xl" />
      </div>
      <h1>Telegram</h1>
      <div><FontAwesomeIcon icon={faMagnifyingGlass} size="xl" /></div>
      {isDropdownOpen && (
        <div className={`dropdown ${isDarkMode ? 'dark' : ''}`} ref={dropdownRef}>
          <ul>
            <li>
              Dark Mode 
              <label className="switch">
                <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                <span className="slider round "></span>
              </label>
            </li>
            <li>Settings</li>
            <li>Report</li>
            <li>Install</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
