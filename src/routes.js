import { Router } from 'express';

import UserController from './app/controllers/userControlller';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// User
routes.post('/users', UserController.store);
routes.post('/users', UserController.update);

routes.post('/sessions', SessionController.store);

export default routes;
