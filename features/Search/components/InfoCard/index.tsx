import { useMemo } from 'react';
import type { SearchTypes } from 'features/Search/@types';
import type { AddressResponse, TransactionResponse } from 'api/@types';
import {
  CashIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentDownloadIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from '@heroicons/react/solid';

type Props = {
  title: string;
  data: TransactionResponse | AddressResponse;
  type: SearchTypes;
};

const InfoCard = ({ title, data, type }: Props) => {
  const fields = useMemo(() => {
    if (type === 'transaction') {
      const transaction = data as TransactionResponse;
      return [
        {
          icon: <ClockIcon className="w-6 h-6 text-slate-500" />,
          title: 'Received time',
          value: transaction.received,
        },
        {
          icon:
            transaction.confirmations > 0 ? (
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            ) : (
              <XCircleIcon className="w-6 h-6 text-red-500" />
            ),
          title: 'Status',
          value: transaction.confirmations > 0 ? 'Confirmed' : 'Not confirmed',
        },
      ];
    }

    const address = data as AddressResponse;
    return [
      {
        icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
        title: 'Confirmed transactions',
        value: address.txrefs.reduce(
          (value, tx) => (tx.confirmed ? value + 1 : 0),
          0
        ),
      },
      {
        icon: <DocumentDownloadIcon className="w-6 h-6 text-slate-500" />,
        title: 'Total BTC received',
        value: address.total_received,
      },
      {
        icon: <PlusCircleIcon className="w-6 h-6 text-blue-500" />,
        title: 'Total BTC spent',
        value: address.txrefs.reduce(
          (value, tx) => (tx.spent ? value + tx.value : 0),
          0
        ),
      },
      {
        icon: <MinusCircleIcon className="w-6 h-6 text-rose-500" />,
        title: 'Total BTC unspent',
        value: address.txrefs.reduce(
          (value, tx) => (!tx.spent ? value + tx.value : 0),
          0
        ),
      },
      {
        icon: <CashIcon className="w-6 h-6 text-green-700" />,
        title: 'Current address balance',
        value: address.balance,
      },
    ];
  }, [data, type]);

  return (
    <div className="bg-white border border-slate-300 py-4 px-6 space-y-6 rounded-md">
      <h5 className="text-xl font-semibold text-slate-900">{title}</h5>
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
