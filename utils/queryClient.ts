import { getAddress, getTransaction } from 'features/Search/api';
import { QueryClient } from 'react-query';

export const createClient = () => {
  const queryClient = new QueryClient();

  queryClient.setMutationDefaults('transaction', {
    mutationFn: getTransaction,
  });
  queryClient.setMutationDefaults('address', {
    mutationFn: getAddress,
  });

  return queryClient;
};
