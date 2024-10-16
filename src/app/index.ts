import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

export async function initServer() {
    const app = express();

    app.use(bodyParser.json());


const graphqlserver = new ApolloServer({
  typeDefs: `
  type Query {
      hello: String,
      sayHelloToMe(name: String!) : String
    }  
  `,
  resolvers: {
    Query: {
        hello: () => 'Hello, from GraphQL Server!',
        sayHelloToMe: (parent: any, {name}:{name: string}) => `Hey ${name}`
    },
 },
});
await graphqlserver.start();
  app.use('/graphql', expressMiddleware(graphqlserver));
  return app;
}
