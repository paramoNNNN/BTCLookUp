import type { NextApiRequest, NextApiResponse } from 'next';
import { checkRequest } from 'pages/api/utils';
import { supabase } from 'pages/api/utils/supabase';
import { NOTIFICATIONS_TABLE, SUBSCRIBED_HASHES_TABLE } from 'pages/api/consts';
import {
  NotificationsTable,
  SubscribedHashTable,
  SubscribeResponse,
} from 'pages/api/@types';

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
    .filter('hash', 'eq', hash)
    .single();
  if (existingHash) {
    await supabase
      .from<NotificationsTable>(NOTIFICATIONS_TABLE)
      .delete()
      .match({ hash: existingHash.id });
    const deleteResponse = await supabase
      .from<SubscribedHashTable>(SUBSCRIBED_HASHES_TABLE)
      .delete()
      .match({ user, hash });
    return res
      .status(deleteResponse.status)
      .json({
        status:
          deleteResponse.status === 200 ? 'deleted' : deleteResponse.statusText,
      });
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
