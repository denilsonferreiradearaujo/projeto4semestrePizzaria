import { Request, Response } from "express";
import { UpdateTaxaEntregaService } from "../../services/taxaEntrega/UpdateTaxaEntregaService";

class UpdateTaxaEntregaController {
    async handle(req: Request, res: Response) {
        // Obtém o 'id' dos parâmetros da URL e os valores requisitados do corpo da requisição
        const { id } = req.params;
        const { distanciaMin, distanciaMax, valor } = req.body
    
        const updateTaxaEntregaService = new UpdateTaxaEntregaService();

        try {
            //Executa a atualização
            const updatedTaxaEntrega = await updateTaxaEntregaService.execute({
                id,
                distanciaMin,
                distanciaMax,
                valor
            });

            return res.json(updatedTaxaEntrega);
        } catch (error: any) {
            return res.status(400).json({ error : error.message });
        }
    }
}

export { UpdateTaxaEntregaController }