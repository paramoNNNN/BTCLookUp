import type {
  AddressResponse,
  SubscribeResponse,
  TransactionResponse,
} from 'api/@types';
import { axiosClientInstance } from 'api/config/axios';
import { clientEndpoints } from 'api/config/endpoints';
import { getUser } from 'utils';
import { SearchTypes } from '../@types';

type GetTransactionParams = {
  hash: string;
};

export const getTransaction = async ({ hash }: GetTransactionParams) => {
  const { data } = await axiosClientInstance.get<TransactionResponse>(
    `${clientEndpoints.transaction}/${hash}`
  );
  return data;
};

type GetAddressParams = {
  address: string;
};

export const getAddress = async ({ address }: GetAddressParams) => {
  const { data } = await axiosClientInstance.get<AddressResponse>(
    `${clientEndpoints.address}/${address}`
  );
  return data;
};

type SubscribeToHashParams = {
  hash: string;
  type: SearchTypes;
};

export const subscribeToHash = async ({
  hash,
  type,
}: SubscribeToHashParams) => {
  const { data } = await axiosClientInstance.post<SubscribeResponse>(
    `${clientEndpoints.subscribe}/${hash}`,
    { user: getUser(), type }
  );
  return data;
};
