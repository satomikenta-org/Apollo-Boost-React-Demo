import React, { useState, useEffect } from 'react';
import { useClient } from './graphql-client';
import { HelloQuery } from './graphql/queries.js';



const  App = () => {
  
  const [ hello, setHello ] = useState("");
  const client = useClient();
  
  useEffect( () => {
    handleRequest();
  }, []);

  const handleRequest = async () => {
    try {
      const { data: {hello} } = await client.query({ query: HelloQuery, variables: {}});
      setHello(hello);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h2>{hello}</h2>
    </div>
  );
}

export default App;
