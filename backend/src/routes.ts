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
import { ListProductController } from "./controllers/product/listProductController";
import { UpdateProductController } from "./controllers/product/UpdateProductController";

// MiddleWares
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAuthorized } from "./middlewares/isAuthorized"; // isAuthorized(['funcionario', 'cliente' ])

const router = Router();

// Rotas User
router.post('/users', new CreateUserController().handle)
router.post('/login', new AuthUserController().handle)
router.get('/users/:pessoa_id', isAuthenticated, new DetailUserController().handle)
router.get('/users', isAuthenticated,  new DetailAllUserController().handle)
router.post('/forgotPassword', new ForgotPasswordController().handle)
router.post('/resetPassword/:token', new ResetPasswordUserController().handle)

// Rotas categoria
router.post('/category', isAuthenticated, isAuthorized(['funcionario']) ,new CreateCategoryController().handle)
router.get('/listCategory',  isAuthenticated, isAuthorized(['funcionario']) ,new ListCategoryController().handle)
router.post('/updateCategory/:id', isAuthenticated, isAuthorized(['funcionario']) ,new UpdateCategoryController().handle)

// Rotas produto
router.post('/createProduct', isAuthenticated, isAuthorized(['funcionario']), new CreateProductController().handle)
router.get('/listProduct', isAuthenticated, isAuthorized(['funcionario']), new ListProductController().handle)
router.get('/updateProduct', isAuthenticated, isAuthorized(['funcionario']), new UpdateProductController().handle)


export {router};


