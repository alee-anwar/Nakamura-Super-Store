import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ConstructionOutlined } from '@mui/icons-material';

async function loginUser(credentials) {
  return fetch('http://localhost:3000/authUser/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login( {setToken}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Clicked")
 
    const token = await loginUser({
      email,
      password
    });
    console.log(`token ${token}`);
    setToken(token);
   
  };

  return(
    <form style={{ display: "flex",
      flexDirection: "column",
      alignItems: "center"}} onSubmit={handleSubmit}>
      <h1>Please Log In</h1>
      <label>
        <p>Email</p>
        <input type="email" onChange={e => setEmail(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}