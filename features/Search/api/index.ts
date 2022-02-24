import type {
  AddressResponse,
  SubscribeResponse,
  TransactionResponse,
} from 'api/@types';
import { axiosClientInstance } from 'api/config/axios';
import { clientEndpoints } from 'api/config/endpoints';
import { getUser } from 'utils';
import type {
  GetAddressParams,
  GetTransactionParams,
  SubscribeToHashParams,
} from '../@types';

export const getTransaction = async ({ hash }: GetTransactionParams) => {
  const { data } = await axiosClientInstance.post<TransactionResponse>(
    `${clientEndpoints.transaction}/${hash}`,
    { user: getUser() }
  );
  return data;
};

export const getAddress = async ({ address }: GetAddressParams) => {
  const { data } = await axiosClientInstance.post<AddressResponse>(
    `${clientEndpoints.address}/${address}`,
    { user: getUser() }
  );
  return data;
};

export const subscribeToHash = async ({
  hash,
  type,
  info,
}: SubscribeToHashParams) => {
  const { data } = await axiosClientInstance.post<SubscribeResponse>(
    `${clientEndpoints.subscribe}/${hash}`,
    { user: getUser(), type, info }
  );
  return data;
};
