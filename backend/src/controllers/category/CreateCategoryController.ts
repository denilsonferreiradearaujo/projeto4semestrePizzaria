import { Request, Response } from "express";
import { CreateCategoriaService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { nome } = request.body;

    const createCategoryService = new CreateCategoriaService();

    const category = await createCategoryService.execute({
      nome
    });
      return response.json(category);
  }
}

export { CreateCategoryController };