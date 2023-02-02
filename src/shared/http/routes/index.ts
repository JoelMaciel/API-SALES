import { Router } from 'express';

const routes = Router();

routes.get('/', (resquest, response) => {
  return response.json({ message: 'Joel Maciel' });
});

export default routes;
