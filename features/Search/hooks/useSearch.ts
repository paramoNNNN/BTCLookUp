import { AddressResponse, TransactionResponse } from 'api/@types';
import { useMutation, useQueryClient } from 'react-query';
import { GetAddressParams, GetTransactionParams, SearchTypes } from '../@types';

type MutateParams = {
  type: SearchTypes;
  query: string;
};

export const useSearch = () => {
  const queryClient = useQueryClient();
  const {
    data: addressData,
    mutateAsync: addressMutate,
    isLoading: addressLoading,
    reset: addressReset,
  } = useMutation<AddressResponse, unknown, GetAddressParams>('address', {
    onSuccess: (data) => {
      // Update queryData if mutation used anywhere else globally
      queryClient.setQueriesData('address', data);
    },
  });
  const {
    data: transactionData,
    mutateAsync: transactionMutate,
    isLoading: transactionLoading,
    reset: transactionReset,
  } = useMutation<TransactionResponse, unknown, GetTransactionParams>(
    'transaction',
    {
      onSuccess: (data) => {
        // Update queryData if mutation used anywhere else globally
        queryClient.setQueriesData('transaction', data);
      },
    }
  );

  const search = ({ type, query }: MutateParams) => {
    if (type === 'address') {
      transactionReset();
      addressMutate({ address: query });
    } else if (type === 'transaction') {
      addressReset();
      transactionMutate({ hash: query });
    }
  };

  return {
    data: addressData || transactionData,
    search,
    loading: addressLoading || transactionLoading,
    addressMutate,
    transactionMutate,
  };
};
