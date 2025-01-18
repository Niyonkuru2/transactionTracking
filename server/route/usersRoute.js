import express from 'express'
import {registerUser,loginUser,requestresetPassword,resetPassword} from '../controllers/userControllers.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/request-reset-password',requestresetPassword);
userRouter.post('/reset-password/:token',resetPassword);

export default userRouter;