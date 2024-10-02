import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { DetailAllUserController } from "./controllers/user/DetailAllUserController";
import { ForgotPasswordController } from './controllers/user/ForgotPasswordController';
import { ResetPasswordUserController } from './controllers/user/ResetPasswordUserController';

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { UpdateCategoryController } from "./controllers/category/UpdateCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductController } from "./controllers/product/ListProductController";
import { UpdateProductController } from "./controllers/product/UpdateProductController";

// Importa o controlador de taxa de entrega
import { CreateTaxaEntregaController } from "./controllers/taxaEntrega/CreateTaxaEntregaController";
import { ListAllTaxaEntregaController } from "./controllers/taxaEntrega/ListAllTaxaEntregaController"; // Importa o controlador para listar todas as taxas de entrega

// MiddleWares
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAuthorized } from "./middlewares/isAuthorized"; // isAuthorized(['funcionario', 'cliente' ])

const router = Router();

// Rotas User
router.post('/users', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);
router.get('/users/:pessoa_id', new DetailUserController().handle);
router.get('/users', new DetailAllUserController().handle);
router.post('/forgotPassword', new ForgotPasswordController().handle);
router.post('/resetPassword/:token', new ResetPasswordUserController().handle);

// Rotas categoria
router.post('/category', new CreateCategoryController().handle);
router.get('/listCategory', new ListCategoryController().handle);
router.post('/updateCategory/:id', new UpdateCategoryController().handle);

// Rotas produto
router.post('/createProduct', new CreateProductController().handle);
router.get('/listProduct', new ListProductController().handle);
router.get('/updateProduct', new UpdateProductController().handle);

// Rotas taxa de entrega
router.post('/addTaxaEntrega', new CreateTaxaEntregaController().handle);
router.get('/taxasEntrega', new ListAllTaxaEntregaController().handle);

export { router };
