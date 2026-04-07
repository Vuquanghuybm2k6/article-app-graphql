import express, { Express } from "express";
import * as database from './config/database'
import dotenv from "dotenv"
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
const startServer = async () => {
  dotenv.config()

  const app: Express = express();
  const port: string | number = process.env.PORT || 3000;

  await database.connect()

  // GraphQL schema
  
  
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  await apolloServer.start();

  // middleware mới
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(apolloServer)
  )

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}/graphql`);
  });
}

startServer();