import React, { useState } from 'react';
import '../styles/registration-styles.css';


const validateField = (name, value) => {
  switch (name) {
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ''
        : 'Invalid email format';

    case 'phone':
      return /^\d{10}$/.test(value)
        ? ''
        : 'Phone number must be 10 digits';

    case 'studentId':
      return /^[a-zA-Z0-9]+$/.test(value)
        ? ''
        : 'Student ID must be alphanumeric';

    case 'publishedYear':
      return /^\d{4}$/.test(value) && parseInt(value) <= new Date().getFullYear()
        ? ''
        : 'Invalid year';

    case 'credits':
      return !isNaN(value) && parseInt(value) > 0
        ? ''
        : 'Credits must be a positive number';

    default:
      return value.trim() ? '' : 'This field is required';
  }
};


const LecturerRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      console.log('Lecturer Registration:', formData);
      
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Lecturer Registration</h2>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
        {errors.subject && <span className="error">{errors.subject}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};


const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    dateOfBirth: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      console.log('Student Registration:', formData);
      
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Student Registration</h2>

      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="studentId">Student ID:</label>
        <input
          type="text"
          id="studentId"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
        />
        {errors.studentId && <span className="error">{errors.studentId}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};


const DriverRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    phone: '',
    vehicleType: ''
  });
  const [errors, setErrors] = useState({});

  const vehicleTypes = ['Car', 'Truck', 'Motorcycle'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      console.log('Driver Registration:', formData);
      
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Driver Registration</h2>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="licenseNumber">License Number:</label>
        <input
          type="text"
          id="licenseNumber"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
        />
        {errors.licenseNumber && <span className="error">{errors.licenseNumber}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="vehicleType">Vehicle Type:</label>
        <select
          id="vehicleType"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
        >
          <option value="">Select vehicle type</option>
          {vehicleTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.vehicleType && <span className="error">{errors.vehicleType}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};


const BookRegistrationForm = () => {
  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    isbn: '',
    publishedYear: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  
  const validateISBN = (isbn) => {
    
    const cleanISBN = isbn.replace(/[-\s]/g, '');
    
    
    if (cleanISBN.length !== 10 && cleanISBN.length !== 13) {
      return 'ISBN must be 10 or 13 digits';
    }

    if (!/^\d{10}(\d{3})?$/.test(cleanISBN)) {
      return 'ISBN must contain only numbers';
    }

    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    
    if (!formData.bookTitle.trim()) {
      newErrors.bookTitle = 'Book title is required';
    }

    
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }

    
    const isbnError = validateISBN(formData.isbn);
    if (isbnError) {
      newErrors.isbn = isbnError;
    }

    
    const year = parseInt(formData.publishedYear);
    const currentYear = new Date().getFullYear();
    if (!formData.publishedYear || year < 1000 || year > currentYear) {
      newErrors.publishedYear = `Year must be between 1000 and ${currentYear}`;
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Book Registration:', formData);
        setSuccessMessage('Book registered successfully!');
        
        setFormData({
          bookTitle: '',
          author: '',
          isbn: '',
          publishedYear: ''
        });
      } catch (error) {
        setErrors({ submit: 'Failed to register book. Please try again.' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form className="registration-form book" onSubmit={handleSubmit}>
      <h2>Book Registration</h2>
      
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="form-group">
        <label htmlFor="bookTitle">Book Title:</label>
        <input
          type="text"
          id="bookTitle"
          name="bookTitle"
          value={formData.bookTitle}
          onChange={handleChange}
          placeholder="Enter book title"
        />
        {errors.bookTitle && <span className="error">{errors.bookTitle}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
        />
        {errors.author && <span className="error">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="Enter ISBN (10 or 13 digits)"
        />
        {errors.isbn && <span className="error">{errors.isbn}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="publishedYear">Published Year:</label>
        <input
          type="number"
          id="publishedYear"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
          placeholder="Enter published year"
          min="1000"
          max={new Date().getFullYear()}
        />
        {errors.publishedYear && <span className="error">{errors.publishedYear}</span>}
      </div>

      <button type="submit">Register Book</button>
    </form>
  );
};


const ModuleRegistrationForm = () => {
  const [formData, setFormData] = useState({
    moduleName: '',
    moduleCode: '',
    description: '',
    credits: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  
  const validateModuleCode = (code) => {
    const moduleCodeRegex = /^[A-Z]{2,4}\d{3}$/;
    if (!moduleCodeRegex.test(code)) {
      return 'Module code must be 2-4 capital letters followed by 3 digits (e.g., CS101)';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    
    if (!formData.moduleName.trim()) {
      newErrors.moduleName = 'Module name is required';
    }

    
    const moduleCodeError = validateModuleCode(formData.moduleCode);
    if (moduleCodeError) {
      newErrors.moduleCode = moduleCodeError;
    }

    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    
    const credits = parseInt(formData.credits);
    if (!formData.credits || isNaN(credits) || credits <= 0) {
      newErrors.credits = 'Credits must be a positive number';
    } else if (credits > 20) {
      newErrors.credits = 'Credits cannot exceed 20';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSuccessMessage('');

    
    if (name === 'moduleCode') {
      setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Module Registration:', formData);
        setSuccessMessage('Module registered successfully!');
        
        setFormData({
          moduleName: '',
          moduleCode: '',
          description: '',
          credits: ''
        });
      } catch (error) {
        setErrors({ submit: 'Failed to register module. Please try again.' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form className="registration-form module" onSubmit={handleSubmit}>
      <h2>Module Registration</h2>
      
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="form-group">
        <label htmlFor="moduleName">Module Name:</label>
        <input
          type="text"
          id="moduleName"
          name="moduleName"
          value={formData.moduleName}
          onChange={handleChange}
          placeholder="Enter module name"
        />
        {errors.moduleName && <span className="error">{errors.moduleName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="moduleCode">Module Code:</label>
        <input
          type="text"
          id="moduleCode"
          name="moduleCode"
          value={formData.moduleCode}
          onChange={handleChange}
          placeholder="e.g., CS101"
          maxLength={7}
        />
        {errors.moduleCode && <span className="error">{errors.moduleCode}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter module description"
          rows={4}
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="credits">Credits:</label>
        <input
          type="number"
          id="credits"
          name="credits"
          value={formData.credits}
          onChange={handleChange}
          placeholder="Enter credits"
          min="1"
          max="20"
        />
        {errors.credits && <span className="error">{errors.credits}</span>}
      </div>

      <button type="submit">Register Module</button>
    </form>
  );
};


export { LecturerRegistrationForm, StudentRegistrationForm, DriverRegistrationForm, BookRegistrationForm, ModuleRegistrationForm};