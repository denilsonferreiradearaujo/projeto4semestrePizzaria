import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    console.log("Body da requisição:", req.body); // Verifique se o body chega corretamente

    const { nome, email, senha, tipoLogin, genero, dataNasc, cpf, tipo, cep, logradouro, numero, complemento, bairro, cidade, uf, telefones } = req.body;
    console.log("console do ", nome) 

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

    console.log("cadastro", user)

    return res.json(user);
  }
}

export { CreateUserController };