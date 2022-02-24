import { NextApiRequest, NextApiResponse } from 'next';
import { SubscribedHashTable, TransactionResponse } from 'pages/api/@types';
import { axiosInstance } from 'pages/api/config/axios';
import { endpoints } from 'pages/api/config/endpoints';
import { checkRequest } from 'pages/api/utils';
import { supabase } from 'pages/api/utils/supabase';
import { SUBSCRIBED_HASHES_TABLE } from 'pages/api/consts';

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
