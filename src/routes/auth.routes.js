import { Router } from "express";
import { loginUser, logoutUser, registerUser, getCurrentUser, verificationEmail, refreshAccessToken, forgotPasswordRequest, resetForgotPassword, changeCurrentPassword, resendEmailVerification } from "../controller/user.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { userRegisterValidator,userLoginValidator, userForgotPasswordValidator, userChangeCurrentPasswordValidator, userResetPasswordValidator} from "../validators/index.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const authRouter = Router()

authRouter.route('/register').post(userRegisterValidator(),validate,registerUser)
authRouter.route('/login').post(userLoginValidator(),validate,loginUser)
authRouter.route('/logout').post(verifyJWT,logoutUser)
authRouter.route('/verify-email/:verificationToken').get(verificationEmail)
authRouter.route('/refresh-token').post(refreshAccessToken)
authRouter.route('/forgot-password').post(userForgotPasswordValidator(),validate,forgotPasswordRequest)
authRouter.route('/reset-password/:resetToken').post(userResetPasswordValidator(),resetForgotPassword)
authRouter.route('/current-user').get(verifyJWT,getCurrentUser)
authRouter.route('/change-password').post(verifyJWT,userChangeCurrentPasswordValidator(),validate,changeCurrentPassword)
authRouter.route('/resend-email-verification').post(verifyJWT,resendEmailVerification)


export default authRouter