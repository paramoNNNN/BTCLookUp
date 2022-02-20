import type { NextApiRequest, NextApiResponse } from 'next';
import { AddressResponse } from 'api/@types';
import { axiosInstance } from 'api/config/axios';
import { endpoints } from 'api/config/endpoints';
import { checkRequest } from 'api/utils';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AddressResponse>
) {
	const { address } = req.query;
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
		.get<AddressResponse>(`${endpoints.addrs}/${address}`)
		.catch(({ response }) => {
			res.status(response.status).json(response.data);
		});
	if (response) {
		res.status(200).json({ ...response.data });
	}
}
