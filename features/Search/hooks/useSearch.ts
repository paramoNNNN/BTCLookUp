import { useMutation } from 'react-query';
import { SearchTypes } from '../@types';
import { getAddress, getTransaction } from '../api';

type MutateParams = {
  type: SearchTypes;
  query: string;
};

export const useSearch = () => {
  const {
    data: addressData,
    mutate: addressMutate,
    isLoading: addressLoading,
    reset: addressReset,
  } = useMutation('address', getAddress);
  const {
    data: transactionData,
    mutate: transactionMutate,
    isLoading: transactionLoading,
    reset: transactionReset,
  } = useMutation('transaction', getTransaction);

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
  };
};
