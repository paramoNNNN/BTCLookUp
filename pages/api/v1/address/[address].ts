import type { NextApiRequest, NextApiResponse } from 'next';
import { AddressResponse } from '../../@types';
import { axiosInstance } from '../../config/axios';
import { endpoints } from '../../config/endpoints';
import { checkRequest } from '../../utils';

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
