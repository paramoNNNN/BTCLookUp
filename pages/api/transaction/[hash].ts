import { NextApiRequest, NextApiResponse } from 'next';
import { SubscribedHashTable, TransactionResponse } from 'api/@types';
import { axiosInstance } from 'api/config/axios';
import { endpoints } from 'api/config/endpoints';
import { checkRequest } from 'api/utils';
import { supabase } from 'api/utils/supabase';
import { SUBSCRIBED_HASHES_TABLE } from 'api/consts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TransactionResponse>
) {
  const { hash } = req.query;
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
    .from<SubscribedHashTable>(SUBSCRIBED_HASHES_TABLE)
    .select()
    .match({ hash, user })
    .single();

  const response = await axiosInstance
    .get<TransactionResponse>(`${endpoints.txs}/${hash}`)
    .catch(({ response }) => {
      res.status(response.status).json(response.data);
    });
  if (response) {
    res.status(200).json({ ...response.data, subscribed: !!subscribedHash });
  }
}
