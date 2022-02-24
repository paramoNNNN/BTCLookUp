import type { AddressResponse, TransactionResponse } from 'pages/api/@types';
import type { SelectOption } from 'components/Select';

export type SearchTypes = 'transaction' | 'address';

export type SearchForm = {
  searchType: SelectOption<SearchTypes>;
  query: string;
};

export type GetTransactionParams = {
  hash: string;
};

export type GetAddressParams = {
  address: string;
};

export type SubscribeToHashParams = {
  hash: string;
  type: SearchTypes;
  info: AddressResponse | TransactionResponse;
};
