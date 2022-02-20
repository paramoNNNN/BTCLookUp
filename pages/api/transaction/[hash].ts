import { TransactionResponse } from 'api/@types';
import { axiosInstance } from 'api/config/axios';
import { endpoints } from 'api/config/endpoints';
import { checkRequest } from 'api/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<TransactionResponse>
) {
	const { hash } = req.query;
	if (
		!checkRequest({
			req,
			res,
			acceptableMethods: ['GET'],
		})
	) {
		return;
	}

	const response = await axiosInstance
		.get<TransactionResponse>(`${endpoints.txs}/${hash}`)
		.catch(({ response }) => {
			res.status(response.status).json(response.data);
		});
	if (response) {
		res.status(200).json({ ...response.data });
	}
}
