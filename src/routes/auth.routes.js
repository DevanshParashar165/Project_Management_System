import { Router } from "express";
import { loginUser, logoutUser, registerUser, getCurrentUser } from "../controller/user.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { userRegisterValidator,userLoginValidator} from "../validators/index.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const authRouter = Router()

authRouter.route('/register').post(userRegisterValidator(),validate,registerUser)
authRouter.route('/login').post(userLoginValidator(),validate,loginUser)
authRouter.route('/logout').post(verifyJWT,logoutUser)

export default authRouter