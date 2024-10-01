// controllers/product/ListProductController.ts

import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
  async handle(req: Request, res: Response) {
    const listProductService = new ListProductService();

    // Executa o serviço para obter todos os produtos
    const produtos = await listProductService.execute();

    return res.json(produtos);
  }
}

export { ListProductController };
