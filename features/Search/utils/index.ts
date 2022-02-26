import { validate as validateBTCAddress } from 'bitcoin-address-validation';
import type { SearchTypes } from '../@types';

export const validateQuery = (query: string) => {
  const isAddress = validateBTCAddress(query);
  const isTransaction = !!query?.match(/^[a-fA-F0-9]{64}$/);
  const type: SearchTypes | undefined = isAddress
    ? 'address'
    : isTransaction
    ? 'transaction'
    : undefined;

  return { valid: isAddress || isTransaction, type };
};
