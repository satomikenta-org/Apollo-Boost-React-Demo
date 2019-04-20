import { useState, useEffect } from 'react';
import ApolloClient from "apollo-boost";
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/graphql';

export const useClient = (authState) => {
  const [ idToken, setIdToken ] = useState("");
  
  useEffect(() => {
    console.log("useClient re-triggered!! I Re-Fetch JWT from LocalStroage");
    setIdToken(window.localStorage.getItem('jwt'));
  }, [authState]); // Thank authState arg for ReTriggerring setIdToken when authState changed.  
  
  const client = new ApolloClient({
    uri: BASE_URL,
    request: operation => {
      operation.setContext({
        headers: { authorization: idToken }
      });
    },
    onError: ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch (err.extensions.code) {
            case 'UNAUTHENTICATED':
              console.log("AUTH_ERROR", err); break;
            case 'ANOTHER_ERROR':
              console.log("ANOTHER_SPECIFIC_ERROR", err); break;
            default: console.log("ANOTER_ERROR", err);
          }
        }
      } else {
        console.log("SOMETHING WENT WRONG. MAYBE NETWORK ERROR");
      }
    },
  });

  return client;
};

