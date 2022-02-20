import type { AddressResponse, TransactionResponse } from 'api/@types';
import { axiosClientInstance } from 'api/config/axios';
import { clientEndpoints } from 'api/config/endpoints';

type GetTransactionParams = {
  hash: string;
};

export const getTransaction = async ({ hash }: GetTransactionParams) =>
  await axiosClientInstance.get<TransactionResponse>(
    `${clientEndpoints.transaction}/${hash}`
  );

type GetAddressParams = {
  address: string;
};

export const getAddress = async ({ address }: GetAddressParams) =>
  await axiosClientInstance.get<AddressResponse>(
    `${clientEndpoints.address}/${address}`
  );
