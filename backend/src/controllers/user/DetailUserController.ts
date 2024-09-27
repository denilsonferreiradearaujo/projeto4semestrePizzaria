// DetailUserController.ts
import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
  async handle(request: Request, response: Response) {
    const { pessoa_id } = request.params;

    const detailUserService = new DetailUserService();
    const user = await detailUserService.execute(Number(pessoa_id)); // Converte `pessoa_id` para número

    return response.json(user);
  }
}

export { DetailUserController };
