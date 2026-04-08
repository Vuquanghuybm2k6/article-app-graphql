import {gql} from "apollo-server-express"
export const typeDefsCategory = gql `
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