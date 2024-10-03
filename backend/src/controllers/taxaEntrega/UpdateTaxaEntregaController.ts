import { Request, Response } from "express";
import { UpdateTaxaEntregaService } from "../../services/taxaEntrega/UpdateTaxaEntregaService";

class UpdateTaxaEntregaController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { distanciaMin, distanciaMax, valor } = req.body;

    const updateTaxaEntregaService = new UpdateTaxaEntregaService();

    try {
      // Converte o valor para número antes de chamar o serviço
      const valorNumerico = parseFloat(valor);

      // Chama o serviço para atualizar a taxa de entrega
      const updatedTaxaEntrega = await updateTaxaEntregaService.execute({
        id,
        distanciaMin,
        distanciaMax,
        valor: valorNumerico,
      });

      // Garantimos que `valor` será tratado como número, caso o Prisma retorne como string
      const valorFormatado = Number(updatedTaxaEntrega.valor).toFixed(2);

      // Retorna a taxa de entrega atualizada com o valor formatado
      return res.status(200).json({
        ...updatedTaxaEntrega,
        valor: valorFormatado,
      });
    } catch (error: any) {
      // Retorna erro 400 com a mensagem detalhada
      return res.status(400).json({
        error: error.message || "Erro inesperado ao atualizar a taxa de entrega.",
      });
    }
  }
}

export { UpdateTaxaEntregaController };
