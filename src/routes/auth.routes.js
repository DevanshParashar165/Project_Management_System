import { Router } from "express";
import { loginUser, registerUser } from "../controller/user.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { userRegisterValidator,userLoginValidator } from "../validators/index.js";

const authRouter = Router()

authRouter.route('/register').post(userRegisterValidator(),validate,registerUser)
authRouter.route('/login').post(userLoginValidator(),validate,loginUser)

export default authRouter