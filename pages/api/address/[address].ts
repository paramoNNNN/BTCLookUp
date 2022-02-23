import type { NextApiRequest, NextApiResponse } from 'next';
import { AddressResponse } from 'api/@types';
import { axiosInstance } from 'api/config/axios';
import { endpoints } from 'api/config/endpoints';
import { checkRequest } from 'api/utils';
import { SUBSCRIBED_HASHES_TABLE } from 'api/consts';
import { supabase } from 'api/utils/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AddressResponse>
) {
  const { address } = req.query;
  const { user } = req.body;
  if (
    !checkRequest({
      req,
      res,
      acceptableMethods: ['POST'],
    })
  ) {
    return;
  }

  const { data: subscribedHash } = await supabase
    .from(SUBSCRIBED_HASHES_TABLE)
    .select()
    .match({ hash: address, user })
    .single();

  const response = await axiosInstance
    .get<AddressResponse>(`${endpoints.addrs}/${address}`)
    .catch(({ response }) => {
      res.status(response.status).json(response.data);
    });
  if (response) {
    res.status(200).json({ ...response.data, subscribed: !!subscribedHash });
  }
}
