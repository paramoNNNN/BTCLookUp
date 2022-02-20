import type { SelectOption } from 'components/Select';

export type SearchTypes = 'transaction' | 'address';

export type SearchForm = {
  searchType: SelectOption<SearchTypes>;
  query: string;
};
