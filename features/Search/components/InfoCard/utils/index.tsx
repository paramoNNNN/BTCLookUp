import { Decimal } from 'decimal.js-light';
import {
  BadgeCheckIcon,
  CashIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DatabaseIcon,
  DocumentDownloadIcon,
  DocumentIcon,
  LoginIcon,
  LogoutIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from '@heroicons/react/solid';
import type { AddressResponse, TransactionResponse } from 'pages/api/@types';
import { SearchTypes } from 'features/Search/@types';

type TransformDataParams = {
  data: TransactionResponse | AddressResponse;
  type: SearchTypes;
};

const satoshiToBTC = (satoshi: number) =>
  `${new Decimal(satoshi || 0).div(100_000_000).toNumber()} BTC`;

export const transformData = ({ data, type }: TransformDataParams) => {
  if (type === 'transaction') {
    const transaction = data as TransactionResponse;
    return [
      {
        icon: <DocumentIcon className="w-6 h-6 text-gray-500" />,
        title: 'Hash',
        value: transaction.hash,
      },
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
      {
        icon: <DatabaseIcon className="w-6 h-6 text-orange-500" />,
        title: 'Size',
        value: transaction.size,
      },
      {
        icon: <BadgeCheckIcon className="w-6 h-6 text-green-500" />,
        title: 'Confirmations',
        value: transaction.confirmations,
      },
      {
        icon: <LoginIcon className="w-6 h-6 text-sky-500" />,
        title: 'Total inputs',
        value: transaction.inputs.length,
      },
      {
        icon: <LogoutIcon className="w-6 h-6 text-rose-500" />,
        title: 'Total outputs',
        value: transaction.outputs.length,
      },
      {
        icon: <CurrencyDollarIcon className="w-6 h-6 text-yellow-500" />,
        title: 'Total fees',
        value: satoshiToBTC(transaction.fees),
      },
    ];
  }

  const address = data as AddressResponse;
  return [
    {
      icon: <DocumentIcon className="w-6 h-6 text-gray-500" />,
      title: 'Address',
      value: address.address,
    },
    {
      icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
      title: 'Confirmed transactions',
      value: address.final_n_tx,
    },
    {
      icon: <DocumentDownloadIcon className="w-6 h-6 text-slate-500" />,
      title: 'Total BTC received',
      value: satoshiToBTC(address.total_received),
    },
    {
      icon: <PlusCircleIcon className="w-6 h-6 text-blue-500" />,
      title: 'Total BTC spent',
      value: satoshiToBTC(
        address.txrefs.reduce(
          (value, tx) => (tx.spent ? value + tx.value : 0),
          0
        )
      ),
    },
    {
      icon: <MinusCircleIcon className="w-6 h-6 text-rose-500" />,
      title: 'Total BTC unspent',
      value: satoshiToBTC(
        address.txrefs.reduce(
          (value, tx) => (!tx.spent ? value + tx.value : 0),
          0
        )
      ),
    },
    {
      icon: <CashIcon className="w-6 h-6 text-green-700" />,
      title: 'Current address balance',
      value: satoshiToBTC(address.final_balance),
    },
  ];
};
