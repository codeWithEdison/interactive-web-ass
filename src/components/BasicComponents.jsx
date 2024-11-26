
import React, { useState, useEffect } from 'react';
import '../styles/basic-styles.css';


const WelcomeMessage = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-text">Welcome to Our React Application</h1>
      <p className="welcome-subtitle">Thank you for visiting our site!</p>
    </div>
  );
};


const CurrentDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="date-container">
      <div className="date-display">
        <div className="date">
          {date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div className="time">
          {date.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};


const HobbyItem = ({ hobby, index }) => {
  return (
    <li className="hobby-item">
      <span className="hobby-number">{index + 1}</span>
      <span className="hobby-text">{hobby}</span>
    </li>
  );
};

const HobbiesList = () => {
  const hobbies = [
    'Reading Books',
    'Playing Guitar',
    'Photography',
    'Hiking',
    'Cooking'
  ];

  return (
    <div className="hobbies-container">
      <h2>My Hobbies</h2>
      <ul className="hobbies-list">
        {hobbies.map((hobby, index) => (
          <HobbyItem 
            key={index}
            hobby={hobby}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
};


const CustomButton = ({ 
  text = "Click Me", 
  color = "primary", 
  size = "medium", 
  onClick,
  disabled = false,
  type = "button",
  icon = null
}) => {
  const buttonClasses = `
    custom-button 
    ${color} 
    ${size}
    ${disabled ? 'disabled' : ''}
    ${icon ? 'with-icon' : ''}
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{text}</span>
    </button>
  );
};


const ProfileCard = ({ 
  name, 
  age, 
  email, 
  avatar = null,
  bio = "",
  social = {}
}) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        {avatar ? (
          <img 
            src={avatar} 
            alt={`${name}'s avatar`} 
            className="profile-avatar"
          />
        ) : (
          <div className="profile-avatar-placeholder">
            {name?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      <div className="profile-content">
        <h2 className="profile-name">{name}</h2>
        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Age:</span>
            <span className="info-value">{age}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{email}</span>
          </div>
        </div>
        
        {bio && (
          <p className="profile-bio">{bio}</p>
        )}

        {Object.keys(social).length > 0 && (
          <div className="social-links">
            {Object.entries(social).map(([platform, url]) => (
              <a 
                key={platform}
                href={url}
                className={`social-link ${platform}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


const DisplayList = ({ items, renderItem, emptyMessage = "No items to display" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const sortedItems = [...filteredItems].sort((a, b) => {
    return sortOrder === 'asc' 
      ? a.localeCompare(b)
      : b.localeCompare(a);
  });

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="list-display">
      <div className="list-controls">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button 
          onClick={toggleSort}
          className="sort-button"
        >
          Sort {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {sortedItems.length > 0 ? (
        <ul className="items-list">
          {sortedItems.map((item, index) => (
            <li key={index} className="list-item">
              {renderItem ? renderItem(item, index) : item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-message">{emptyMessage}</p>
      )}

      <div className="list-footer">
        Total Items: {sortedItems.length}
      </div>
    </div>
  );
};


const UsageExample = () => {
  const sampleItems = [
    'Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'
  ];

  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="examples-container">
      <WelcomeMessage />
      <CurrentDate />
      
      <div className="section">
        <h2>Hobbies Section</h2>
        <HobbiesList />
      </div>

      <div className="section">
        <h2>Button Examples</h2>
        <div className="button-examples">
          <CustomButton 
            text="Primary Button" 
            onClick={handleButtonClick} 
          />
          <CustomButton 
            text="Secondary" 
            color="secondary" 
            size="small" 
          />
          <CustomButton 
            text="Large Disabled" 
            color="primary" 
            size="large" 
            disabled 
          />
        </div>
      </div>

      <div className="section">
        <h2>Profile Example</h2>
        <ProfileCard 
          name="Divine"
          age={28}
          email="divine@gmail.com"
          bio="Frontend Developer passionate about React"
          social={{
            github: "https://github.com/divine",
            linkedin: "https://linkedin.com/divine"
          }}
        />
      </div>

      <div className="section">
        <h2>List Display Example</h2>
        <DisplayList 
          items={sampleItems}
          renderItem={(item, index) => (
            <div className="custom-item">
              <span className="item-number">{index + 1}.</span>
              <span className="item-text">{item}</span>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export {
  WelcomeMessage,
  CurrentDate,
  HobbiesList,
  CustomButton,
  ProfileCard,
  DisplayList,
  UsageExample
};