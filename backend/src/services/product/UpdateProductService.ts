// src/services/product/UpdateProductService.ts
import prismaClient from "../../prisma";
import { Decimal } from "decimal.js"; // Importa a biblioteca Decimal.js

interface TamanhoRequest {
  id?: number; // O ID do tamanho é opcional para identificar os existentes e atualizar.
  tamanho: string;
}

interface ValorRequest {
  id?: number; // O ID do valor é opcional para identificar os existentes e atualizar.
  preco: number;
  tamanho: boolean;
  status: boolean;
}

interface ProdutoUpdateRequest {
  id: number; // ID do produto que será atualizado
  nome?: string;
  categoriaId?: number;
  tamanhos?: TamanhoRequest[];
  valores?: ValorRequest[];
}

class UpdateProductService {
  // Verificar se o produto existe
  private async produtoExiste(id: number) {
    const produto = await prismaClient.produto.findUnique({ where: { id } });
    return !!produto;
  }

  // Atualizar tamanhos do produto
  private async atualizarTamanhos(produtoId: number, tamanhos: TamanhoRequest[]) {
    for (const tamanho of tamanhos) {
      if (tamanho.id) {
        // Se um ID for fornecido, atualizar o tamanho existente
        await prismaClient.tamanho.update({
          where: { id: tamanho.id },
          data: { tamanho: tamanho.tamanho },
        });
      } else {
        // Se não tiver ID, criar um novo tamanho
        await prismaClient.tamanho.create({
          data: { produtoId, tamanho: tamanho.tamanho },
        });
      }
    }
  }

  // Atualizar valores do produto
  private async atualizarValores(produtoId: number, valores: ValorRequest[]) {
    for (const valor of valores) {
      const precoDecimal = new Decimal(valor.preco).toDecimalPlaces(2); // Converte para Decimal e formata

      if (valor.id) {
        // Se um ID for fornecido, atualizar o valor existente
        await prismaClient.valor.update({
          where: { id: valor.id },
          data: { preco: precoDecimal, tamanho: valor.tamanho, status: valor.status },
        });
      } else {
        // Se não tiver ID, criar um novo valor
        await prismaClient.valor.create({
          data: { produtoId, preco: precoDecimal, tamanho: valor.tamanho, status: valor.status },
        });
      }
    }
  }

  // Método principal para atualização do produto
  public async execute({ id, nome, categoriaId, tamanhos, valores }: ProdutoUpdateRequest) {
    // Verificar se o produto existe
    const produtoExiste = await this.produtoExiste(id);
    if (!produtoExiste) {
      throw new Error("Produto não encontrado.");
    }

    // Atualizar os dados do produto
    const produtoAtualizado = await prismaClient.produto.update({
      where: { id },
      data: {
        nome,
        categoriaId,
      },
      include: {
        tamanhos: true,
        valores: true,
      },
    });

    // Atualizar tamanhos se fornecido
    if (tamanhos && tamanhos.length > 0) {
      await this.atualizarTamanhos(id, tamanhos);
    }

    // Atualizar valores se fornecido
    if (valores && valores.length > 0) {
      await this.atualizarValores(id, valores);
    }

    // Buscar produto atualizado com seus relacionamentos
    const produtoCompleto = await prismaClient.produto.findUnique({
      where: { id },
      include: {
        tamanhos: true,
        valores: true,
      },
    });

    return produtoCompleto;
  }
}

export { UpdateProductService };
