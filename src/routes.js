import { Router } from 'express';

import UserController from './app/controllers/userControlller';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// User

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Essas rotas só serão acessíveis ao usário se o mesmo estiver logado

routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
