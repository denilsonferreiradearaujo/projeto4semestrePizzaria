// controllers/user/DetailAllUserController.ts
import { Request, Response } from 'express';
import { DetailAllUsersService } from '../../services/user/DetailAllUsersService';

class DetailAllUserController {
  async handle(request: Request, response: Response) {
    const detailAllUsersService = new DetailAllUsersService();
    const users = await detailAllUsersService.execute();

    return response.json(users);
  }
}

export { DetailAllUserController };
