import { celebrate, Segments,Joi } from "celebrate";
import { Router } from "express";
import UsersController from "../controllers/UsersController";
import isAuthenticated from "../middlewaressss/isAuthenticated";

const userRouter = Router();
const userController = new UsersController();

userRouter.post('/', 
celebrate({[Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    },
}),
userController.create);

userRouter.get('/', isAuthenticated, userController.index);

export default userRouter;