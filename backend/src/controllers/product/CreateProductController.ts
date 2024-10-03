import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { Decimal } from "decimal.js"; // Importa a biblioteca Decimal.js

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { nome, categoriaId, tamanhos, valores } = req.body;

        const createProductService = new CreateProductService();

        const produto = await createProductService.execute({
            nome,
            categoriaId,
            tamanhos,
            valores
        });

        // Formata os valores para duas casas decimais usando Decimal.js
        if (produto.valores) {
            produto.valores = produto.valores.map(valor => ({
                ...valor,
                preco: new Decimal(valor.preco).toDecimalPlaces(2), // Converte o preço para Decimal e formata para 2 casas decimais
            }));
        }

        return res.json(produto);
    }
}

export { CreateProductController };
