import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { nome, email, senha, tipoLogin, genero, dataNasc, cpf, tipo, cep, logradouro, numero, complemento, bairro, cidade, uf, telefones } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      nome,
      email,
      senha,
      tipoLogin,
      genero,
      dataNasc,
      cpf,
      tipo,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      telefones
    });

    return res.json(user);
  }
}

export { CreateUserController };