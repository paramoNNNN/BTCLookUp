import type { NextApiRequest, NextApiResponse } from 'next';
import deepEqual from 'deep-equal';
import { supabase } from 'api/utils/supabase';
import { NOTIFICATIONS_TABLE, SUBSCRIBED_HASHES_TABLE } from 'api/consts';
import { axiosInstance } from 'api/config/axios';
import { endpoints } from 'api/config/endpoints';
import type {
  AddressResponse,
  CheckChangesResponse,
  NotificationsTable,
  SubscribedHashTable,
  TransactionResponse,
} from 'api/@types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckChangesResponse>
) {
  const { data } = await supabase
    .from<SubscribedHashTable>(SUBSCRIBED_HASHES_TABLE)
    .select();

  // Using for loop as we can't use async/await in forEach loop
  for (const { id, type, hash, info, user } of data || []) {
    let data: AddressResponse | TransactionResponse | undefined | void =
      undefined;
    if (type === 'transaction') {
      data = await axiosInstance
        .get<TransactionResponse>(`${endpoints.txs}/${hash}`)
        .then(({ data }) => data)
        .catch(({ response }) => {
          res.status(response.status).json(response.data);
        });
    } else if (type === 'address') {
      data = await axiosInstance
        .get<AddressResponse>(`${endpoints.addrs}/${hash}`)
        .then(({ data }) => data)
        .catch(({ response }) => {
          res.status(response.status).json(response.data);
        });
    }

    // if the data from API is different than what is on the DB,
    // create a notification and update the info of subscribed hash
    if (data && !deepEqual(data, info)) {
      const notification = await supabase
        .from<NotificationsTable>(NOTIFICATIONS_TABLE)
        .select('hash')
        .match({ user, hash: id });
      if (notification.data && notification.data.length === 0) {
        await supabase
          .from<NotificationsTable>(NOTIFICATIONS_TABLE)
          .upsert({ user, hash: id })
          .filter('user', 'not.eq', user)
          .filter('hash', 'not.eq', id);
      }
      await supabase
        .from<SubscribedHashTable>(SUBSCRIBED_HASHES_TABLE)
        .update({ info: data })
        .match({ id });
    }
  }

  res.status(200).json({ status: 'done' });
}
