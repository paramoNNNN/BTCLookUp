import type { AddressResponse, TransactionResponse } from 'api/@types';
import { axiosClientInstance } from 'api/config/axios';
import { clientEndpoints } from 'api/config/endpoints';

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
