import {Router} from 'express';
import { loginController, registerUserController, verifyEmailController } from '../controllers/usercontroller.js';

const userRouter=Router();

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginController)


export default userRouter;