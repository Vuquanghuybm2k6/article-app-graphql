import {gql} from "apollo-server-express"
export const typeDefs = gql `
  type Article {
    id: ID,
    title: String,
    avatar: String,
    description: String
  }
  type Query { # this function to get data
    hello: String,
    getListArticle: [Article]
    getArticle(id: ID): Article # Fe can send id to be
  }
  input ArticleInput{ # format input
    title: String, 
    avatar: String,
    description: String
  }
  type Mutation{ # edit delete or create, we will use this function
    createArticle(article: ArticleInput): Article,
    deleteArticle(id:ID): String
    updateArticle(id:ID, article: ArticleInput): Article
  }
`;