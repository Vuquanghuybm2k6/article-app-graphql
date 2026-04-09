import express, { Express } from "express";
import * as database from './config/database'
import dotenv from "dotenv"
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolver";
import { requireAuth } from "./middlewares/auth.middleware";
const startServer = async () => {
  dotenv.config()

  const app: Express = express();
  const port: string | number = process.env.PORT || 3000;

  await database.connect()

  // GraphQL schema
  app.use("/graphql", requireAuth)
  
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true  // gợi ý code khi đẩy lên online
  })

  await apolloServer.start();

  // middleware mới
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }: { req: express.Request }) => {
        const authReq = req as express.Request & { user?: any }
        return { user: authReq.user }
      }
    })
  )

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}/graphql`);
  });
}

startServer();