import { Controller, useForm } from 'react-hook-form';
import { SearchIcon } from '@heroicons/react/solid';
import Button from 'components/Button';
import Select, { SelectOption } from 'components/Select';
import Input from 'components/Inputs/InputField';
import { SearchForm, SearchTypes } from './@types';
import InfoCard from './components/InfoCard';
import { useSearch } from './hooks/useSearch';

const searchOptions: SelectOption<SearchTypes>[] = [
  { label: 'Address', value: 'address' },
  { label: 'Transaction', value: 'transaction' },
];

const Search = () => {
  const { control, register, handleSubmit, watch } = useForm<SearchForm>({
    mode: 'all',
  });
  const searchType = watch('searchType');
  const { data, search, loading } = useSearch({
    query: watch('query'),
    type: searchType?.value,
  });

  const handleSearch = () => {
    search();
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

        {data && data.data && !loading && (
          <InfoCard data={data.data} type={data.type} />
        )}
      </div>
    </div>
  );
};

export default Search;
