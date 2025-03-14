import {Router} from 'express';
import { registerUserController } from '../controllers/usercontroller.js';

const userRouter=Router();

userRouter.post('/register',registerUserController)

export default userRouter;