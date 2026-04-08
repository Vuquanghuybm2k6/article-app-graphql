import { Request, Response, NextFunction } from "express"
import User from "../models/user.model"

export const requireAuth = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const authReq = req as Request & { user?: any }
  if(req.headers.authorization){
    const token:string = req.headers.authorization.split(" ")[1]
    const user = await User.findOne({
      token: token,
      deleted: false
    }).select("-password")
    if(user){
      authReq.user = user
    }
  }
  next();
 
}