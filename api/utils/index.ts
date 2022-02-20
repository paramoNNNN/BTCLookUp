import type { NextApiRequest, NextApiResponse } from 'next';

type CheckRequestParams = {
	req: NextApiRequest;
	res: NextApiResponse;
	acceptableMethods: string[];
};

export const checkRequest = ({
	req,
	res,
	acceptableMethods,
}: CheckRequestParams) => {
	if (!acceptableMethods.includes(req.method || '')) {
		res.status(400).json({ message: 'Bad Request' });
		return false;
	}
	return true;
};
