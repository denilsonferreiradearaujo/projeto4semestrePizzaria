import prismaClient from "../../prisma";

interface TaxaEntregaRequest {
    id: string; // ID da TAXA DE ENTREGA a ser atualizada
    distanciaMin: number;
    distanciaMax: number;
    valor: number;
}

class UpdateTaxaEntregaService {
    async execute({ id, distanciaMin, distanciaMax, valor }: TaxaEntregaRequest) {
        //Verificar se o ID da TAXA DE ENTREGA foi enviado
        if (!id) {
            throw new Error("O ID da Taxa de Entrega não foi fornecido");
        }

        //Converte o ID para número (number)
        const idNumber = parseInt(id, 10);

        //Verifica se a distancia Mínima foi preenchida
        if (!distanciaMin) {
            throw new Error("O valor da distância mínima não foi preenchido.")
        }

        //Verifica se a distancia Máxima foi preenchida
        if (!distanciaMax) {
            throw new Error("O valor da distância máxima não foi preenchido.")
        }

        //Verifica se o valor foi preenchido
        if (!valor) {
            throw new Error("O valor da taxa de entrega não foi preenchido.")
        }

        //Verifica se a Taxa de Entrega com o ID fornecido existe
        const taxaEntregaExists = await prismaClient.taxaEntrega.findUnique({
            where: { id: idNumber }
        });

        if (!taxaEntregaExists) {
            throw new Error("Taxa de entrega não encontrada.");
        }

        //Verifica se a taxa de entrega com os novos valores já existe
        const taxaEntregavaloresAlreadyExists = await prismaClient.taxaEntrega.findFirst({
            where: {
                distanciaMin,
                distanciaMax,
                NOT: { id: idNumber }, //Ignora a taxa de entrega atual
            },
        });

        if(taxaEntregavaloresAlreadyExists){
            throw new Error("Essa taxa de entrega já existe com os valores fornecidos");
        }

        //Atualiza a taxa de entrega no banco de dados
        const taxaEntregaAtualizada = await prismaClient.taxaEntrega.update({
            where: { id:idNumber },
            data:{
                distanciaMin,
                distanciaMax,
                valor,
            },
            select: {
                id: true,
                distanciaMin: true,
                distanciaMax: true,
                valor: true,
                dataCreate: true,
                dataUpdate: true,
                
            },
        });
           
        return taxaEntregaAtualizada;
    }
}

export { UpdateTaxaEntregaService };