import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SearchIcon } from '@heroicons/react/solid';
import Button from 'components/Button';
import Select, { SelectOption } from 'components/Select';
import Input from 'components/Inputs/InputField';
import { SearchForm, SearchTypes } from './@types';
import { getAddress, getTransaction } from './api';
import InfoCard from './components/InfoCard';
import { AddressResponse, TransactionResponse } from 'api/@types';

const searchOptions: SelectOption<SearchTypes>[] = [
  { label: 'Address', value: 'address' },
  { label: 'Transaction', value: 'transaction' },
];

const Search = () => {
  const { control, register, handleSubmit, watch } = useForm<SearchForm>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TransactionResponse | AddressResponse>();

  const handleSearch = async ({ searchType, query }: SearchForm) => {
    setLoading(true);
    if (searchType.value === 'transaction') {
      const { data } = await getTransaction({ hash: query });
      setData(data);
    } else if (searchType.value === 'address') {
      const { data } = await getAddress({ address: query });
      setData(data);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center h-screen p-10 py-20">
      <div className="w-full max-w-3xl space-y-6">
        <form className="flex space-x-4" onSubmit={handleSubmit(handleSearch)}>
          <Controller
            control={control}
            name="searchType"
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <Select
                  className="min-w-[150px]"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  options={searchOptions}
                />
              );
            }}
          />
          <Input {...register('query')} placeholder="Enter hash" />
          <Button type="submit" icon={SearchIcon} loading={loading}>
            Search
          </Button>
        </form>

        {data && !loading && (
          <InfoCard data={data} type={watch('searchType.value')} />
        )}
      </div>
    </div>
  );
};

export default Search;
