import prismaClient from "../../prisma";

interface TaxaEntregaRequest {
  distanciaMin: number;
  distanciaMax: number;
  valor: number;
}

class CreateTaxaEntregaService {
  async execute({ distanciaMin, distanciaMax, valor }: TaxaEntregaRequest) {
    // Validações básicas
    if (!distanciaMin || distanciaMin <= 0) {
      throw new Error('O valor da distância mínima deve ser um número positivo.');
    }

    if (!distanciaMax || distanciaMax <= distanciaMin) {
      throw new Error('O valor da distância máxima deve ser um número positivo e maior que a distância mínima.');
    }

    if (!valor) {
      throw new Error('Informe um valor corretamente.');
    }

    // Verifica se há sobreposição com outras faixas
    const existingTaxa = await prismaClient.taxaEntrega.findFirst({
      where: {
        AND: [
          { distanciaMin: { lt: distanciaMax } }, // A faixa existente começa antes da nova taxa acabar
          { distanciaMax: { gt: distanciaMin } }, // A faixa existente termina depois da nova taxa começar
        ],
      },
    });

    if (existingTaxa) {
      throw new Error(
        `Já existe uma taxa de entrega cadastrada para essa faixa de distância. A faixa de distância ${existingTaxa.distanciaMin}-${existingTaxa.distanciaMax} já está cadastrada.`
      );
    }

    // Cria a nova taxa de entrega
    const createdTaxa = await prismaClient.taxaEntrega.create({
      data: {
        distanciaMin,
        distanciaMax,
        valor,
      },
    });

    return createdTaxa;
  }
}

export { CreateTaxaEntregaService };
