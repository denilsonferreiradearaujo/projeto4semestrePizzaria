import { Request, Response } from 'express';
import { CreateTaxaEntregaService } from '../../services/taxaEntrega/CreateTaxaEntregaService';

class CreateTaxaEntregaController {
  async handle(req: Request, res: Response) {
    const { distanciaMin, distanciaMax, valor } = req.body;

    const createTaxaEntregaService = new CreateTaxaEntregaService();

    try {
      // Chama o serviço para criar uma nova taxa de entrega
      const novaTaxaEntrega = await createTaxaEntregaService.execute({
        distanciaMin,
        distanciaMax,
        valor,
      });

      // Retorna o status 201 com a taxa de entrega criada
      return res.status(201).json(novaTaxaEntrega);
    } catch (error) {
      // Retorna erro 400 com a mensagem de erro
      return res.status(400).json({
        message: error.message || 'Erro inesperado ao criar a taxa de entrega.',
      });
    }
  }
}

export { CreateTaxaEntregaController };
