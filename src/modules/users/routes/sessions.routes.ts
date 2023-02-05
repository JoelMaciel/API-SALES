import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionRouter = Router();
const sessionController = new SessionsController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionRouter;
