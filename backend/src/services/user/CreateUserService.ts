import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UserRequest {
  name: string;
  email: string;
  senha: string;
  tipoLogin: string;
  genero: string;
  dataNasc: string;
  cpf: string;
  tipo: string;
}

class CreateUserService {
  async execute({ name, email, senha, tipoLogin, genero, dataNasc, cpf, tipo }: UserRequest) {

    // Verificar se email foi enviado
    if (!email) {
      throw new Error('Informe um email correto.');
    }

    // Verificar se o CPF foi enviado
    if (!cpf) {
      throw new Error('Informe um CPF.');
    }

    // Verificar se esse email já existe no cadastro
    const userAlreadyExists = await prismaClient.pessoa.findFirst({
      where: { email }
    });

    if (userAlreadyExists) {
      throw new Error('Email já cadastrado.');
    }

    // Criptografando a senha
    const passwordHash = await hash(senha, 8);

    // Criar o registro na tabela Pessoa e Login
    const user = await prismaClient.pessoa.create({
      data: {
        nome: name,
        email: email,
        genero: genero,
        dataNasc: new Date(dataNasc),
        cpf: cpf,
        tipo: tipo,
        logins: {
          create: {
            senha: passwordHash,
            tipoLogin: tipoLogin,
          }
        }
      },
      select: {
        id: true,
        nome: true,
        email: true,
        logins: {
          select: {
            id: true,
            tipoLogin: true,
          }
        }
      }
    });

    return user;
  }
}

export { CreateUserService };
