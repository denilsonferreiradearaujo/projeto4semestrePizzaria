import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UserRequest {
  nome: string;
  email: string;
  senha: string;
  tipoLogin: string;
  genero: string;
  dataNasc: string;
  cpf: string;
  tipo: string;
  cep: string,
  logradouro: string,
  numero: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  telefones: {
    numero: string;
    tipo: string;
  }[]
}

class CreateUserService {
  async execute({ nome, email, senha, tipoLogin, genero, dataNasc, cpf, tipo, cep, logradouro, numero, complemento, bairro, cidade, uf, telefones }: UserRequest) {

    // Verificar se email foi enviado
    if (!email) {
      throw new Error('Informe um email correto.');
    }

    // Verificar se o CPF foi enviado
    // if (!cpf) {
    //   throw new Error('Informe um CPF.');
    // }

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
        nome: nome,
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
        },
        enderecos: {
          create: {
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
          }
        },
        telefones: {
          create: telefones.map(telefone => ({
            Telefone: {
              create: {
                numero: telefone.numero,
                tipo: telefone.tipo
              }
            }
          }))
        }
      },
      select: {
        id: true,
        nome: true,
        email: true,
        genero: true,
        dataNasc: true,
        cpf: true,
        tipo: true,
        logins: {
          select: {
            id: true,
            tipoLogin: true,
          }
        },
        enderecos: {
          select: {
            id: true,
            cep: true,
            logradouro: true,
            numero: true,
            complemento: true,
            bairro: true,
            cidade: true,
            uf: true,
          }
        },
        telefones: {
          select: {
            Telefone: {
              select: {
                numero: true,
                tipo: true,
              }
            }
          }
        },
        dataCreate: true,
        dataUpdate: true
      }
    });

    return user;
  }
}

export { CreateUserService };
