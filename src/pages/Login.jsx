import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // To disable button during request
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://hostingexp-2.onrender.com/login', 
        { email: email.trim() },
        { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (response.data === "Success") {
        navigate('/home');
      } else {
        setError('Invalid email or user not found');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome Back!</h1>
        <p style={styles.description}>
          Log in to access study groups and continue your learning journey.
        </p>
      </div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input} 
            placeholder="Enter your email address" 
            required 
          />
        </div>
        {error && <p style={styles.errorText}>{error}</p>}
        <button type="submit" style={styles.loginButton} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div style={styles.signupContainer}>
          <h4 style={styles.signupText}>New to the platform?</h4>
          <Link to='/'>
            <button type="button" style={styles.signupButton}>
              Sign Up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '2rem 3.6rem 2rem 2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f9f9f9',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '24px',
    color: '#333',
  },
  description: {
    fontSize: '16px',
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  loginButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  signupContainer: {
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  signupText: {
    marginBottom: '0.5rem',
    fontSize: '14px',
    color: '#555',
  },
  signupButton: {
    backgroundColor: 'transparent',
    color: '#007BFF',
    border: '1px solid #007BFF',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Login;
