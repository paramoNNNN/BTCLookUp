import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { BellIcon as BellSolidIcon } from '@heroicons/react/solid';
import { BellIcon as BellOutlineIcon } from '@heroicons/react/outline';
import type { AddressResponse, TransactionResponse } from 'api/@types';
import Button from 'components/Button';
import type { SearchTypes } from 'features/Search/@types';
import { subscribeToHash } from 'features/Search/api';
import { transformData } from './utils';

type Props = {
  data: TransactionResponse | AddressResponse;
  type: SearchTypes;
};

const typeLabels: Record<SearchTypes, string> = {
  transaction: 'Transaction',
  address: 'Address',
};

const InfoCard = ({ data, type }: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation('subscribe', subscribeToHash, {
    onSuccess: async (response) => {
      // Update transaction/address data by mutating them again
      if (type === 'transaction' && 'hash' in data) {
        queryClient.setQueryData('transaction', (currentData) => ({
          ...(currentData as TransactionResponse),
          subscribed: response.status === 'created',
        }));
      } else if (type === 'address' && 'address' in data) {
        queryClient.setQueryData('address', (currentData) => ({
          ...(currentData as AddressResponse),
          subscribed: response.status === 'created',
        }));
      }

      if (response.status === 'created') {
        toast.success('Successfully subscribed to changes');
      } else if (response.status === 'deleted') {
        toast.success('Removed from subscriptions');
      }
    },
    onError: () => {
      toast.error('Something unexpected happened, please try again.');
    },
  });

  const fields = useMemo(() => transformData({ data, type }), [data, type]);

  const handleSubscribe = async () => {
    const hash = 'hash' in data ? data.hash : data.address;
    await mutateAsync({ hash, type, info: data });
  };

  return (
    <div className="bg-white border border-slate-300 py-4 px-6 space-y-4 rounded-md">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-semibold text-slate-900">
          {typeLabels[type]}
        </h5>

        <Button
          className="!border-transparent"
          layout="transparent"
          onClick={handleSubscribe}
          loading={isLoading}
          title={data.subscribed ? 'Unsubscribe' : 'Subscribe to changes'}
        >
          {data.subscribed ? (
            <BellSolidIcon className="w-5 h-5 text-slate-900" />
          ) : (
            <BellOutlineIcon className="w-5 h-5 text-slate-900" />
          )}
        </Button>
      </div>
      <ul className="flex flex-col gap-3">
        {fields.map(({ icon, title, value }) => (
          <li key={title} className="flex items-center space-x-2">
            {icon}
            <h6 className="font-medium">{title}:</h6>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoCard;
