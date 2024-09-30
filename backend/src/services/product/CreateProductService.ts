import prismaClient from "../../prisma";

interface TamanhoRequest {
  tamanho: string;
}

interface ValorRequest {
  preco: number;
  tamanho: boolean;
  status: boolean;
}

interface ProdutoRequest {
  nome: string;
  categoriaId: number;
  tamanhos?: TamanhoRequest[];
  valores?: ValorRequest[];
}

class CreateProdutoService {
  // Função auxiliar para verificar se o produto já existe
  private async produtoJaExiste(nome: string, categoriaId: number) {
    const produto = await prismaClient.produto.findFirst({
      where: { nome, categoriaId },
    });

    return !!produto; // Retorna verdadeiro se o produto existir
  }

  // Função auxiliar para criar tamanhos associados ao produto
  private async criarTamanhos(produtoId: number, tamanhos: TamanhoRequest[]) {
    return await prismaClient.tamanho.createMany({
      data: tamanhos.map((t) => ({
        produtoId,
        tamanho: t.tamanho,
      })),
    });
  }

  // Função auxiliar para criar valores associados ao produto
  private async criarValores(produtoId: number, valores: ValorRequest[]) {
    return await prismaClient.valor.createMany({
      data: valores.map((v) => ({
        produtoId,
        preco: v.preco,
        tamanho: v.tamanho,
        status: v.status,
      })),
    });
  }

  // Método principal para criar o produto
  public async execute({ nome, categoriaId, tamanhos, valores }: ProdutoRequest) {
    // Validações iniciais
    if (!nome || !categoriaId) {
      throw new Error("Nome do produto e categoria são obrigatórios.");
    }

    // Verifica se o produto já existe na categoria
    const produtoExiste = await this.produtoJaExiste(nome, categoriaId);
    if (produtoExiste) {
      throw new Error("Esse produto já existe na categoria selecionada.");
    }

    // Cria o produto
    const produto = await prismaClient.produto.create({
      data: { nome, categoriaId },
      select: { id: true, nome: true, categoriaId: true, dataCreate: true, dataUpdate: true },
    });

    // Se tamanhos forem fornecidos, cria-os
    if (tamanhos && tamanhos.length > 0) {
      await this.criarTamanhos(produto.id, tamanhos);
    }

    // Se valores forem fornecidos, cria-os
    if (valores && valores.length > 0) {
      await this.criarValores(produto.id, valores);
    }

    // Retorna o produto criado, incluindo as relações
    const produtoCompleto = await prismaClient.produto.findUnique({
      where: { id: produto.id },
      include: {
        tamanhos: true,
        valores: true,
      },
    });

    return produtoCompleto;
  }
}

export { CreateProdutoService };
