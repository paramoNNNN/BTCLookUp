import type { NextApiRequest, NextApiResponse } from 'next';
import { checkRequest } from 'api/utils';
import { supabase } from 'api/utils/supabase';
import { SUBSCRIBED_HASHES_TABLE } from 'api/consts';
import type { SubscribedHashTable, SubscribeResponse } from 'api/@types';

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
    .from<SubscribedHashTable>(SUBSCRIBED_HASHES_TABLE)
    .select()
    .filter('user', 'eq', user)
    .filter('hash', 'eq', hash);
  if (existingHash && existingHash.length > 0) {
    await supabase
      .from<SubscribedHashTable>(SUBSCRIBED_HASHES_TABLE)
      .delete()
      .match({ user, hash });
    return res.status(200).json({ status: 'deleted' });
  }

  const { data, status } = await supabase
    .from<SubscribedHashTable>(SUBSCRIBED_HASHES_TABLE)
    .upsert({ user, hash: hash as string, type, info })
    .single();

  res.status(status).json({
    data,
    status: 'created',
  });
}
