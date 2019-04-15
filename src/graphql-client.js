import { useState, useEffect } from 'react';
import ApolloClient from "apollo-boost";

const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL: 'http://localhost:4000/graphql';

export const useClient = () => {
  const [ idToken, setIdToken ] = useState("");
  
  useEffect(() => {
    // setIdToken(window.localStorage.getItem('jwt'));
  }, []);
  const client = new ApolloClient({
    uri: BASE_URL,
    request: operation => {
      operation.setContext({
        headers: {}
      });
    }
  });

  return client;
};
