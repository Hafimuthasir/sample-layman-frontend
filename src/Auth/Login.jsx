import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {setIsAuthenticated} = useAuth()
  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault();
      await axios.post('http://localhost:8000/api/login', { username, password }).then((response)=>{
        console.log(response.data);
        localStorage.setItem('access_token', response.data.access_token); 
        setIsAuthenticated(true)
        navigate('/')
      }).catch((error)=>{
        console.log(error);
        // setError(error.response.data.message || 'An error occurred');
        setIsAuthenticated(false)
      });
      
  };


  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      navigate('/')
    }
    
  }, []);

  return (
    <div>
      <h2>Login</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
