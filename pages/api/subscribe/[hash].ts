import type { NextApiRequest, NextApiResponse } from 'next';
import { checkRequest } from 'api/utils';
import { supabase } from 'api/utils/supabase';
import { SubscribeResponse } from 'api/@types';
import { SUBSCRIBED_HASHES_TABLE } from 'api/consts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeResponse>
) {
  const { hash } = req.query;
  const { user, type, info } = req.body;
  if (
    !checkRequest({
      req,
      res,
      acceptableMethods: ['POST'],
    })
  ) {
    return;
  }

  const { data: existingHash } = await supabase
    .from(SUBSCRIBED_HASHES_TABLE)
    .select()
    .filter('user', 'eq', user)
    .filter('hash', 'eq', hash);
  if (existingHash && existingHash.length > 0) {
    await supabase.from(SUBSCRIBED_HASHES_TABLE).delete().match({ user, hash });
    return res.status(200).json({ status: 'deleted' });
  }

  const response = await supabase
    .from(SUBSCRIBED_HASHES_TABLE)
    .upsert({ user, hash, type, info })
    .single();

  res.status(response.status).json({
    data: response.data as SubscribeResponse['data'],
    status: 'created',
  });
}
