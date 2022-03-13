import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import {ws} from 'isomorphic-ws';

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: "wss://mail-box.hasura.app/v1/graphql",
    webSocketImpl: ws,
    options: {
      reconnect: true,
      connectionParams:{
        headers:{
          "content-type":"application/json",
          "x-hasura-admin-secret":"whTw432IHIKcCJasv0f9RSrvYQYEciNOZXgYq7nnux0yDmhUHegDbR5iuZddqkkq"
        },
      }
    },
  }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
