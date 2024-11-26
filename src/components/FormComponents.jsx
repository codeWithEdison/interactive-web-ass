
import React, { useState } from 'react';
import '../styles/form-styles.css';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Login attempt:', formData);
        
        setFormData({ username: '', password: '' });
        alert('Login successful!');
      } catch (error) {
        setErrors({ submit: 'Login failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
            disabled={isLoading}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              disabled={isLoading}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <button 
          type="submit" 
          className={`submit-button ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};


const ControlledForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedValues, setSubmittedValues] = useState([]);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) { 
      setInputValue(value);
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSubmittedValues(prev => [...prev, inputValue]);
      setInputValue('');
      setCharCount(0);
    }
  };

  return (
    <div className="form-container">
      <h2>Controlled Form</h2>
      <form onSubmit={handleSubmit} className="controlled-form">
        <div className="form-group">
          <label htmlFor="controlledInput">Enter Text</label>
          <input
            type="text"
            id="controlledInput"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type something..."
          />
          <div className="char-count">
            {charCount}/50 characters
          </div>
        </div>

        <button type="submit" disabled={!inputValue.trim()}>
          Submit
        </button>

        {submittedValues.length > 0 && (
          <div className="submitted-values">
            <h3>Submitted Values:</h3>
            <ul>
              {submittedValues.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};


const ValidationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;

    const requirements = [];
    if (!hasUpperCase) requirements.push('uppercase letter');
    if (!hasLowerCase) requirements.push('lowercase letter');
    if (!hasNumber) requirements.push('number');
    if (!hasSpecialChar) requirements.push('special character');
    if (!isLongEnough) requirements.push('8+ characters');

    return requirements;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Invalid email format';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        const requirements = validatePassword(value);
        if (requirements.length > 0) {
          newErrors.password = `Password must contain: ${requirements.join(', ')}`;
        } else {
          delete newErrors.password;
        }
        
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);

    
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
      
    }
  };

  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return '';
    return errors[fieldName] ? 'error' : 'valid';
  };

  return (
    <div className="form-container">
      <h2>Validation Form</h2>
      <form onSubmit={handleSubmit} className="validation-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldStatus('email')}
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldStatus('password')}
          />
          {touched.password && errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getFieldStatus('confirmPassword')}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    
    firstName: '',
    lastName: '',
    email: '',
    
    street: '',
    city: '',
    state: '',
    zipCode: '',
    
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const updateFormData = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    switch (stepNumber) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        break;

      case 2:
        if (!formData.street) newErrors.street = 'Street is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
        else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
          newErrors.zipCode = 'Invalid ZIP code format';
        }
        break;

      case 3:
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv) newErrors.cvv = 'CVV is required';
        break;

      default:
        break;
    }

    return newErrors;
  };

  const nextStep = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length === 0) {
      setStep(prev => prev + 1);
    } else {
      setErrors(stepErrors);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepErrors = validateStep(3);
    if (Object.keys(stepErrors).length === 0) {
      console.log('Form submitted:', formData);
      
      alert('Form submitted successfully!');
    } else {
      setErrors(stepErrors);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h3>Personal Information</h3>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>
        );

      

      case 2:
        return (
          <div className="form-step">
            <h3>Address Information</h3>
            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => updateFormData('street', e.target.value)}
                className={errors.street ? 'error' : ''}
              />
              {errors.street && <span className="error-message">{errors.street}</span>}
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => updateFormData('city', e.target.value)}
                className={errors.city ? 'error' : ''}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => updateFormData('state', e.target.value)}
                className={errors.state ? 'error' : ''}
              />
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>
            <div className="form-group">
              <label>ZIP Code</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => updateFormData('zipCode', e.target.value)}
                className={errors.zipCode ? 'error' : ''}
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h3>Payment Information</h3>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => updateFormData('cardNumber', e.target.value)}
                className={errors.cardNumber ? 'error' : ''}
                maxLength="16"
              />
              {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => updateFormData('expiryDate', e.target.value)}
                className={errors.expiryDate ? 'error' : ''}
                placeholder="MM/YY"
                maxLength="5"
              />
              {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) => updateFormData('cvv', e.target.value)}
                className={errors.cvv ? 'error' : ''}
                maxLength="3"
              />
              {errors.cvv && <span className="error-message">{errors.cvv}</span>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <h2>Multi-step Form</h2>
      <div className="progress-bar">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>
      
      <form onSubmit={handleSubmit} className="multi-step-form">
        {renderStep()}
        
        <div className="form-navigation">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="prev-button">
              Previous
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="next-button">
              Next
            </button>
          ) : (
            <button type="submit" className="submit-button">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};


const CheckboxForm = () => {
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false
  });
  const [selectAll, setSelectAll] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes(prev => ({
      ...prev,
      [name]: checked
    }));
    
    
    const updatedCheckboxes = {
      ...checkboxes,
      [name]: checked
    };
    setSelectAll(Object.values(updatedCheckboxes).every(value => value));
  };

  const handleSelectAll = (event) => {
    const { checked } = event.target;
    setSelectAll(checked);
    setCheckboxes(Object.keys(checkboxes).reduce((acc, key) => ({
      ...acc,
      [key]: checked
    }), {}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedOptions = Object.entries(checkboxes)
      .filter(([_, selected]) => selected)
      .map(([option]) => option);
    
    console.log('Selected options:', selectedOptions);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const getSelectedCount = () => {
    return Object.values(checkboxes).filter(value => value).length;
  };

  return (
    <div className="form-container">
      <h2>Checkbox Form</h2>
      <form onSubmit={handleSubmit} className="checkbox-form">
        <div className="select-all-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <span>Select All</span>
          </label>
        </div>

        <div className="checkbox-group">
          {Object.keys(checkboxes).map((option) => (
            <label key={option} className="checkbox-label">
              <input
                type="checkbox"
                name={option}
                checked={checkboxes[option]}
                onChange={handleCheckboxChange}
              />
              <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
            </label>
          ))}
        </div>

        <div className="selected-count">
          Selected: {getSelectedCount()} of {Object.keys(checkboxes).length}
        </div>

        <button 
          type="submit" 
          disabled={getSelectedCount() === 0}
          className={submitted ? 'success' : ''}
        >
          {submitted ? 'Submitted!' : 'Submit'}
        </button>

        {submitted && (
          <div className="success-message">
            Form submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export {
  LoginForm,
  ControlledForm,
  ValidationForm,
  MultiStepForm,
  CheckboxForm
};