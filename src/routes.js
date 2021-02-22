import { Router } from 'express';

import UserController from './app/controllers/UserControlller';
import SessionController from './app/controllers/SessionController';
import ProductsDogsController from './app/controllers/ProductsDogsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// User

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Essas rotas só serão acessíveis ao usário se o mesmo estiver logado

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/products_dogs', ProductsDogsController.store);

export default routes;
