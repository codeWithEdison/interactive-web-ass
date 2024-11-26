import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';

import { WelcomeMessage, CurrentDate, HobbiesList, CustomButton, ProfileCard } from './components/BasicComponents';
import { ToggleButton, Counter, ColorChangeDiv, FormLogger, DropdownMenu } from './components/EventComponents';
import { LoginForm, ControlledForm, ValidationForm, MultiStepForm, CheckboxForm } from './components/FormComponents';
import { Home, About, Contact, ProductDetails, BlogLayout, NotFound } from './components/RoutingComponents';
import { ParentComponent, HeavyCalculationComponent, TodoList, LiveTimeComponent } from './components/MemoComponents';
import { 
  LecturerRegistrationForm, 
  StudentRegistrationForm, 
  DriverRegistrationForm,
  BookRegistrationForm,
  ModuleRegistrationForm 
} from './components/RegistrationForms';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1>React Components Demo</h1>
          <nav className="main-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/components">Basic Components</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/forms">Forms</NavLink>
            <NavLink to="/routing-demo">Routing Demo</NavLink>
            <NavLink to="/memo">Memo Examples</NavLink>
            <NavLink to="/registration">Registration</NavLink>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            
            <Route path="/" element={
              <div className="welcome-section">
                <WelcomeMessage />
                <CurrentDate />
              </div>
            } />

            <Route path="/components" element={
              <div className="section">
                <h2>Basic Components</h2>
                <div className="component-grid">
                  <HobbiesList />
                  <div className="button-showcase">
                    <CustomButton text="Primary Button" color="primary" />
                    <CustomButton text="Secondary Button" color="secondary" />
                  </div>
                  <ProfileCard 
                    name="Divine" 
                    age={22} 
                    email="divine@gmail.com" 
                  />
                </div>
              </div>
            } />

           
            <Route path="/events" element={
              <div className="section">
                <h2>Event Components</h2>
                <div className="component-grid">
                  <ToggleButton />
                  <Counter />
                  <ColorChangeDiv />
                  <FormLogger />
                  <DropdownMenu />
                </div>
              </div>
            } />

            
            <Route path="/forms/*" element={
              <Routes>
                <Route index element={
                  <div className="section">
                    <h2>Form Components</h2>
                    <nav className="sub-nav">
                      <Link to="login">Login Form</Link>
                      <Link to="controlled">Controlled Form</Link>
                      <Link to="validation">Validation Form</Link>
                      <Link to="multi-step">Multi-Step Form</Link>
                      <Link to="checkbox">Checkbox Form</Link>
                    </nav>
                  </div>
                } />
                <Route path="login" element={<LoginForm />} />
                <Route path="controlled" element={<ControlledForm />} />
                <Route path="validation" element={<ValidationForm />} />
                <Route path="multi-step" element={<MultiStepForm />} />
                <Route path="checkbox" element={<CheckboxForm />} />
              </Routes>
            } />

            
            <Route path="/routing-demo/*" element={
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/blog/*" element={<BlogLayout />} />
              </Routes>
            } />

            
            <Route path="/memo" element={
              <div className="section">
                <h2>Memo Examples</h2>
                <div className="component-grid">
                  <ParentComponent />
                  <HeavyCalculationComponent number={1000} />
                  <TodoList />
                  <LiveTimeComponent />
                </div>
              </div>
            } />

            
            <Route path="/registration/*" element={
              <Routes>
                <Route index element={
                  <div className="section">
                    <h2>Registration Forms</h2>
                    <nav className="sub-nav">
                      <Link to="lecturer">Lecturer</Link>
                      <Link to="student">Student</Link>
                      <Link to="driver">Driver</Link>
                      <Link to="book">Book</Link>
                      <Link to="module">Module</Link>
                    </nav>
                  </div>
                } />
                <Route path="lecturer" element={<LecturerRegistrationForm />} />
                <Route path="student" element={<StudentRegistrationForm />} />
                <Route path="driver" element={<DriverRegistrationForm />} />
                <Route path="book" element={<BookRegistrationForm />} />
                <Route path="module" element={<ModuleRegistrationForm />} />
              </Routes>
            } />

            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>React Components Demo - Interactive Web Development Assignment</p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;