import { Request, Response } from "express";
import { CreateProdutoService } from "../../services/product/CreateProductService";

class CreateProdutoController {
    async handle(req: Request, res: Response) {
      const { nome, categoriaId, tamanhos, valores } = req.body;
  
      const createProdutoService = new CreateProdutoService();
  
      const produto = await createProdutoService.execute({
        nome,
        categoriaId,
        tamanhos,
        valores
      });
  
      return res.json(produto);
    }
  }
  
  export { CreateProdutoController };