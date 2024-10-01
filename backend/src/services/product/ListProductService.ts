// services/product/ListProductService.ts

import prismaClient from "../../prisma";

class ListProductService {
  async execute() {
    // Busca todos os produtos, incluindo tamanhos e valores relacionados
    const produtos = await prismaClient.produto.findMany({
      include: {
        tamanhos: true, // Inclui os tamanhos relacionados ao produto
        valores: true, // Inclui os valores relacionados ao produto
        Categoria: {
          select: {
            nome: true, // Inclui o nome da categoria
          },
        },
      },
    });

    return produtos;
  }
}

export { ListProductService };
