import axios from 'axios';
const BASE_URL = "http://localhost:4000/auth";

export const login = async (name, email) => {
  try {
    const params = { name, email };
    const {data} = await axios.post(`${BASE_URL}/login`, params);
    window.localStorage.setItem('jwt', data.token);
    return true;
  } catch(err){
    return false;
  }
};

export const register = async (name, email) => {
  try {
    const params = { name, email };
    await axios.post(`${BASE_URL}/signup`, params);
    return true;
  } catch(err){
    return false;
  }
};

export const logout = async () => window.localStorage.removeItem('jwt');

export const validator = (name, email) => {
  if (name !== "" && email !== "") {
    return true;
  } else {
    return false;
  }
};

export const getJWT = () => {
  const token = window.localStorage.getItem('jwt');
  if (token) return token;
  return false;
};

export const deleteJWT = () => {
  window.localStorage.removeItem('jwt');
};