import {gql} from "apollo-server-express"
export const typeDefs = gql `
  type Article {
    id: ID,
    title: String,
    avatar: String,
    description: String
    category: Category
  }
  type Category {
    id: ID,
    title: String,
    avatar: String,
  }
  type Query { # this function to get data
    getListArticle: [Article],
    getArticle(id: ID): Article, # Fe can send id to be
    getListCategory: [Category],
    getCategory(id: ID): Category, # Fe can send id to be


  },
  input ArticleInput{ # format input
    title: String, 
    avatar: String,
    description: String,
    categoryId: String 
  },
  input CategoryInput{ # format input
    title: String, 
    avatar: String,
    description: String
  },
  type Mutation{ # edit delete or create, we will use this function
    createArticle(article: ArticleInput): Article,
    deleteArticle(id:ID): String,
    updateArticle(id:ID, article: ArticleInput): Article,

    createCategory(category: CategoryInput): Category,
    deleteCategory(id:ID): String,
    updateCategory(id:ID, category: CategoryInput): Category
  }
`;