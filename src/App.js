import React, { useState, useEffect } from 'react';
import { useClient } from './graphql-client';
import { Me } from './graphql/queries.js';
import { getJWT, deleteJWT, logout } from './lib/auth';

import Auth from './Auth';
import Post from './Post';

const App = () => {

  const [ isAuth, setIsAuth ] = useState(null);
  const [ me, setMe ] = useState(null);
  useEffect( () => {
    setIsAuth(getJWT());
  }, []);

  const client = useClient(isAuth);

  // Need to be Re-triggered to ReFetch New JWT from localstorage.
  // ( useClient is not re-triggered, idToken is not changed.) 
  // That's why pass 'isAuth' parameter to useClient Hook to re-triggered.
  const handleGetMe = async () => {
    try {
      const { data: { me } } = await client.query({ query: Me, variables: {}});
      setMe(me);
    } catch (err) {
      if (err.message === "GraphQL error: You are not authenticated"){
        setIsAuth(false);
        deleteJWT();
        alert("Please Login");
      }
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuth(false);
  };

  return (
    <div className="App">
      <h2>Welcome !</h2>
      { isAuth && (
      <div>
        <h5>LOGOUT</h5>
        <button type="button" onClick={handleLogout}>LOGOUT</button>
      </div>
      )}
      <br/>
      { !isAuth && <Auth setIsAuth={setIsAuth}/>}
      <div>
        <h3>Get Your Info</h3>
        <button onClick={handleGetMe}>GetMe</button>
      </div>
      { me && (
        <div>
          <h5>Your</h5>
          <ul>
            <li>ID is {me.id}</li>
            <li>Name is {me.name}</li>
            <li>Email is {me.email}</li>
          </ul>
        </div>)
      }
      <Post/>
    </div>
  );
}

export default App;
