import React, { useState, useEffect } from 'react';
import { useClient } from './graphql-client';
import { Me } from './graphql/queries.js';
import { getJWT } from './lib/auth';

import Auth from './Auth';
import Post from './Post';

const App = () => {

  const [ isAuth, setIsAuth ] = useState(null);
  const [ me, setMe ] = useState(null);
  useEffect( () => {
    setIsAuth(getJWT());
  }, []);

  let client = useClient();

  const handleGetMe = async () => {
    try {
      const { data: { me } } = await client.query({ query: Me, variables: {}});
      setMe(me);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="App">
      <h2>Welcome !</h2>
      <br/>
      { !isAuth && <Auth/>}
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
