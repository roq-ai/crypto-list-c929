import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { cryptoCurrencyExchangeValidationSchema } from 'validationSchema/crypto-currency-exchanges';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.crypto_currency_exchange
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCryptoCurrencyExchangeById();
    case 'PUT':
      return updateCryptoCurrencyExchangeById();
    case 'DELETE':
      return deleteCryptoCurrencyExchangeById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCryptoCurrencyExchangeById() {
    const data = await prisma.crypto_currency_exchange.findFirst(
      convertQueryToPrismaUtil(req.query, 'crypto_currency_exchange'),
    );
    return res.status(200).json(data);
  }

  async function updateCryptoCurrencyExchangeById() {
    await cryptoCurrencyExchangeValidationSchema.validate(req.body);
    const data = await prisma.crypto_currency_exchange.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCryptoCurrencyExchangeById() {
    const data = await prisma.crypto_currency_exchange.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
