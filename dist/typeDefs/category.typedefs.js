"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsCategory = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsCategory = (0, apollo_server_express_1.gql) `
  type Category {
    id: ID,
    title: String,
    avatar: String,
  }
  type Query { # this function to get data
    getListCategory: [Category],
    getCategory(id: ID): Category, # Fe can send id to be

  },
  input CategoryInput{ # format input
    title: String, 
    avatar: String,
    description: String
  },
  type Mutation{ # edit delete or create, we will use this function
    createCategory(category: CategoryInput): Category,
    deleteCategory(id:ID): String,
    updateCategory(id:ID, category: CategoryInput): Category
  }
`;
