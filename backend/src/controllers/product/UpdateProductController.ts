// src/controllers/product/UpdateProductController.ts
import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";
import { Decimal } from "decimal.js"; // Importa a biblioteca Decimal.js

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, categoriaId, tamanhos, valores } = req.body;

    // Converter o `id` para número
    const idNumero = parseInt(id);

    // Verificar se `id` é um número válido
    if (isNaN(idNumero)) {
      return res.status(400).json({ error: "ID do produto deve ser um número válido." });
    }

    // Formatar os valores para decimal antes de enviar para o serviço
    if (valores && valores.length > 0) {
      valores.forEach(valor => {
        valor.preco = new Decimal(valor.preco).toDecimalPlaces(2).toNumber(); // Converte para Decimal e formata para 2 casas decimais
      });
    }

    const updateProductService = new UpdateProductService();

    try {
      const produtoAtualizado = await updateProductService.execute({
        id: idNumero,
        nome,
        categoriaId,
        tamanhos,
        valores
      });

      return res.json(produtoAtualizado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateProductController };
