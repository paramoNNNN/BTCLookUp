import { AddressResponse, TransactionResponse } from 'pages/api/@types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from 'react-query';
import type { SearchTypes } from '../@types';
import { getAddress, getTransaction } from '../api';

type UseSearchParams = {
  query: string;
  type: SearchTypes;
};

export const useSearch = ({ query, type }: UseSearchParams) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState<{
    data: AddressResponse | TransactionResponse | undefined;
    type: SearchTypes | undefined;
  }>({ data: undefined, type: undefined });
  const {
    data: addressData,
    refetch: addressRefetch,
    isFetching: addressFetching,
    isLoading: addressLoading,
  } = useQuery(
    'address',
    async () => {
      return await getAddress({ address: query });
    },
    {
      onError: (error) => {
        toast.error((error as Error).message);
        setData({ data: undefined, type: undefined });
      },
      enabled: false,
      retry: false,
    }
  );
  const {
    data: transactionData,
    refetch: transactionRefetch,
    isFetching: transactionFetching,
    isLoading: transactionLoading,
  } = useQuery<TransactionResponse>(
    'transaction',
    async () => {
      return await getTransaction({ hash: query });
    },
    {
      onError: (error) => {
        toast.error((error as Error).message);
        setData({ data: undefined, type: undefined });
      },
      enabled: false,
      retry: false,
    }
  );

  useEffect(() => {
    if (data?.type !== type) {
      queryClient.removeQueries(data?.type);
    }
    setData({ data: type === 'address' ? addressData : transactionData, type });
  }, [addressData, transactionData, type, queryClient, data?.type]);

  const search = () => {
    if (type === 'address') {
      addressRefetch();
    } else if (type === 'transaction') {
      transactionRefetch();
    }
  };

  return {
    searchData: data,
    loading:
      addressLoading ||
      addressFetching ||
      transactionLoading ||
      transactionFetching,
    search,
  };
};
