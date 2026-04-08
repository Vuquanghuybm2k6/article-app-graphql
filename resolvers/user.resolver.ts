import { generateRandomString } from "../helpers/generate"
import User from "../models/user.model"
import md5 from "md5"
interface UserInput {
  fullName: string
  email: string
  password: string
  token: string
}

interface RegisterUser {
  user: UserInput;
}

export const resolversUser = {
  
  Mutation: {
    registerUser: async (_: any, args: RegisterUser) =>{
      const {user} = args
      const emailExist = await User.findOne({
        email: user.email,
        deleted: false
      })
      if(emailExist){
        return {
          code: 400,
          message: "Email đã tồn tại"
        }
      }
      else{
        user.password = md5(user.password)
        user.token = generateRandomString(30)
        const newUser = new User(user)
        const data = await newUser.save()
        return {
          code: 200,
          message: "Đăng kí thành công!",
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          token: data.token
        }
      }
    }
    
  }
}