"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsArticle = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsArticle = (0, apollo_server_express_1.gql) `
  type Article {
    id: ID,
    title: String,
    avatar: String,
    description: String,
    category: Category
  }
 
  type Query { # this function to get data
    getListArticle(
      sortKey: String,
      sortValue: String,
      currentPage: Int = 1,
      limitItems: Int = 2,
      filterKey: String,
      filterValue: String,
      keyword: String
      ): [Article],
    getArticle(id: ID): Article, # Fe can send id to be


  },
  input ArticleInput{ # format input
    title: String, 
    avatar: String,
    description: String,
    categoryId: String 
  },
  type Mutation{ # edit delete or create, we will use this function
    createArticle(article: ArticleInput): Article,
    deleteArticle(id:ID): String,
    updateArticle(id:ID, article: ArticleInput): Article,

  }
`;
