import React, { useState } from 'react';
import { login, register, validator } from './lib/auth';

const Auth = () => {
  
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");

  const clearInputAndAlert = () => {
    setName("");
    setEmail("");
    alert("Succeeded to Login");
  };

  const onChangeInput = e => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else {
      setEmail(e.target.value);
    }
  };

  const handleRegister = async () => {
    if (validator(name, email)) {
      const result = await register(name, email);
      if (result) {
        clearInputAndAlert();
      } else {
        alert("Failed to Register");
      }
    } else {
      alert("Name and Email is required");
    }
  };

  const handleLogin = async () => {
    if (validator(name, email)) {
      const result = await login(name, email);
      if (result) {
        clearInputAndAlert();
      } else {
        alert("Failed to Login");
      }
    } else {
      alert("Name and Email is requires");
    }
  };

  return (
    <div>
      <div>
        <h3>Please Register Here</h3>
        <input type="text" placeholder="name" name="name" value={name} onChange={onChangeInput}/>
        <input type="email" placeholder="email" name="email" value={email} onChange={onChangeInput}/>
        <button type="button" onClick={handleRegister}>REGISTER</button>
      </div>

      <div>
        <h3>Please Login Here</h3>
        <input type="text" placeholder="name" name="name" value={name} onChange={onChangeInput}/>
        <input type="email" placeholder="email" name="email" value={email} onChange={onChangeInput}/>
        <button type="button" onClick={handleLogin}>LOGIN</button>
      </div>
    </div>
  );
};

export default Auth;