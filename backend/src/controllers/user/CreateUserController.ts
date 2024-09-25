import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, senha, tipoLogin, genero, dataNasc, cpf, tipo } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      senha,
      tipoLogin,
      genero,
      dataNasc,
      cpf,
      tipo
    });

    return res.json(user);
  }
}

export { CreateUserController };
