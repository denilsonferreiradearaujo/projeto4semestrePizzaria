import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { DetailAllUserController } from "./controllers/user/DetailAllUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

const router = Router();

// Rotas User
router.post('/users', new CreateUserController().handle)
router.post('/login', new AuthUserController().handle)
router.get('/users/:pessoa_id', new DetailUserController().handle)
router.get('/users', new DetailAllUserController().handle)
router.post('/category', new CreateCategoryController().handle)

export {router};


