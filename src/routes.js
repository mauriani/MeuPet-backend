import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multerConfig';

import UserController from './app/controllers/UserControlller';
import SessionController from './app/controllers/SessionController';
import ProductsDogsController from './app/controllers/ProductsDogsController';

import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// User

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Essas rotas só serão acessíveis ao usário se o mesmo estiver logado

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/products_dogs', ProductsDogsController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
