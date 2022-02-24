import { Controller, useForm } from 'react-hook-form';
import { SearchIcon } from '@heroicons/react/solid';
import Button from 'components/Button';
import Select, { SelectOption } from 'components/Select';
import Input from 'components/Inputs/InputField';
import { SearchForm, SearchTypes } from './@types';
import InfoCard from './components/InfoCard';
import { useSearch } from './hooks/useSearch';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const searchOptions: SelectOption<SearchTypes>[] = [
  { label: 'Address', value: 'address' },
  { label: 'Transaction', value: 'transaction' },
];

const Search = () => {
  const {
    query: { query },
    pathname,
  } = useRouter();
  const { control, register, setValue, handleSubmit, watch } =
    useForm<SearchForm>({
      mode: 'all',
      defaultValues: {
        query: query as string,
        searchType: searchOptions.find((option) =>
          pathname.startsWith(`/${option.value}`)
        ),
      },
    });
  const searchType = watch('searchType');
  const { searchData, search, loading } = useSearch({
    query: watch('query'),
    type: searchType?.value,
  });

  const handleSearch = () => {
    search();
  };

  useEffect(() => {
    if (query) {
      setValue('query', query as string);
      search();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="flex flex-col items-center h-screen p-10 py-20">
      <div className="w-full max-w-3xl space-y-6">
        <form className="flex space-x-4" onSubmit={handleSubmit(handleSearch)}>
          <Controller
            control={control}
            name="searchType"
            rules={{ required: true }}
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
          <Input
            {...register('query', { required: 'true' })}
            placeholder="Enter hash"
          />
          <Button type="submit" icon={SearchIcon} loading={loading}>
            Search
          </Button>
        </form>

        {searchData.data && searchData.type && !loading && (
          <InfoCard data={searchData.data} type={searchData.type} />
        )}
      </div>
    </div>
  );
};

export default Search;
