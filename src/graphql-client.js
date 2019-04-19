import { useState, useEffect } from 'react';
import ApolloClient from "apollo-boost";
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/graphql';

export const useClient = () => {
  const [ idToken, setIdToken ] = useState("");
  
  useEffect(() => {
    setIdToken(window.localStorage.getItem('jwt'));
  }, []);
  
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
              // one way to handle is to obtain a new token and 
              // add it to the operation context
              // const headers = operation.getContext().headers
              // operation.setContext({
              //   headers: {
              //     ...headers,
              //     authorization: getNewToken(),
              //   },
              // });
              // // Now, pass the modified operation to the next link
              // // in the chain. This effectively intercepts the old
              // // failed request, and retries it with a new token
              // return forward(operation);
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

