
import React, { useState } from 'react';
import '../styles/event-styles.css';


const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="component-container">
      <h3>Toggle Button</h3>
      <button 
        className={`toggle-button ${isOn ? 'on' : 'off'}`}
        onClick={() => setIsOn(!isOn)}
        aria-pressed={isOn}
      >
        {isOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};


const Counter = () => {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => Math.max(0, prev - 1));
  const reset = () => setCount(0);

  return (
    <div className="component-container">
      <h3>Counter</h3>
      <div className="counter-display">Count: {count}</div>
      <div className="counter-controls">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};


const ColorChangeDiv = () => {
  const [bgColor, setBgColor] = useState('#f0f0f0');
  const [isHovered, setIsHovered] = useState(false);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setBgColor(getRandomColor());
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setBgColor('#f0f0f0');
  };

  return (
    <div className="component-container">
      <h3>Color Change on Hover</h3>
      <div 
        className={`color-box ${isHovered ? 'hovered' : ''}`}
        style={{ backgroundColor: bgColor }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Hover over me!
      </div>
    </div>
  );
};


const FormLogger = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [logs, setLogs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      id: Date.now(),
      timestamp,
      data: { ...formData }
    };
    
    setLogs(prev => [logEntry, ...prev].slice(0, 5));
    console.log('Form submitted:', formData);
    
    
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="component-container">
      <h3>Form Logger</h3>
      <form onSubmit={handleSubmit} className="logger-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {logs.length > 0 && (
        <div className="log-display">
          <h4>Recent Submissions:</h4>
          <ul>
            {logs.map(log => (
              <li key={log.id}>
                <span className="timestamp">{log.timestamp}</span>
                <span className="log-data">
                  {log.data.name} - {log.data.email}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4'
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="component-container">
      <h3>Dropdown Menu</h3>
      <div className="dropdown-container">
        <button 
          className="dropdown-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || 'Select an option'} 
          <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
        </button>
        
        {isOpen && (
          <ul className="dropdown-menu">
            {options.map((option, index) => (
              <li 
                key={index}
                onClick={() => handleSelect(option)}
                className={selectedOption === option ? 'selected' : ''}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export {
  ToggleButton,
  Counter,
  ColorChangeDiv,
  FormLogger,
  DropdownMenu
};