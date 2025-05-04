import React, { useState } from 'react';
import Register from './Register';
import LoginPage from './LoginPage';

function AuthToggle() {
  const [isLogin, setIsLogin] = useState(true); // Default to Login page

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between true/false may be true maybe false
  };

  return (
    <div className="container mt-5">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      
      {/* Toggle Buttons */}
      <div className="btn-group mb-3">
        <button className={`btn ${isLogin ? 'btn-primary' : 'btn-outline-primary'}`} onClick={toggleForm}>
          Login
        </button>
        <button className={`btn ${!isLogin ? 'btn-primary' : 'btn-outline-primary'}`} onClick={toggleForm}>
          Register
        </button>
      </div>
      
      {/* Toggle the forms */}
      {isLogin ? <LoginPage /> : <Register />}
    </div>
  );
}

export default AuthToggle;
