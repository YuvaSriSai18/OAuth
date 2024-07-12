import React from 'react';
import './login.css';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
  const loginWithGoogle = () => {
    window.open("http://localhost:5500/auth/google", "_self");
  }

  return (
    <div className='form'>
      <center><h1>Login</h1></center>
      <div className='form-1'>
        <input type="text" name="username" placeholder='username'/>
        <input type="password" name="password" placeholder='password'/>
        <button>Login</button>
        <center>
            <p>Not Registered? <a href="">Create an account</a></p>
        </center>
        <button onClick={loginWithGoogle}>
            <GoogleIcon/>
            Sign In with Google
        </button>
      </div>
    </div>
  );
}
