import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { SearchIcon } from '@heroicons/react/solid';
import Button from 'components/Button';
import Input from 'components/Inputs/InputField';
import Select, { SelectOption } from 'components/Select';
import { SearchForm, SearchTypes } from './@types';
import InfoCard from './components/InfoCard';
import { useSearch } from './hooks/useSearch';
import { validateQuery } from './utils';

const searchOptions: SelectOption<SearchTypes>[] = [
  { label: 'Address', value: 'address' },
  { label: 'Transaction', value: 'transaction' },
];

const Search = () => {
  const {
    push,
    query: { query },
    asPath,
    pathname,
  } = useRouter();
  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<SearchForm>({
    mode: 'all',
    defaultValues: {
      query: query as string,
      searchType: searchOptions.find((option) =>
        pathname.startsWith(`/${option.value}`)
      ),
    },
  });
  const searchType = watch('searchType');
  const searchQuery = watch('query');
  const { searchData, search, loading } = useSearch({
    query: watch('query') || (query as string),
    type: searchType?.value,
  });

  const handleSearch = ({ query, searchType }: SearchForm) => {
    const path = `/${searchType.value}/${query}`;
    if (path !== asPath) {
      push(path);
    } else {
      if (validateQuery(query).valid) {
        search();
      }
    }
  };

  // Perform search on route query change
  useEffect(() => {
    if (query) {
      setValue('query', query as string, { shouldValidate: true });
      handleSearch({
        query: query as string,
        searchType: getValues('searchType'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Change search type based on entered query
  useEffect(() => {
    const result = validateQuery(searchQuery);
    if (result.valid) {
      setValue(
        'searchType',
        searchOptions.find(
          (option) => option.value === result.type
        ) as SelectOption<SearchTypes>
      );
    }
  }, [searchQuery, setValue]);

  return (
    <div className="flex flex-col items-center h-screen p-6 sm:p-10 md:py-20">
      <div className="w-full max-w-3xl space-y-6">
        <form
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
          onSubmit={handleSubmit(handleSearch)}
        >
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
            {...register('query', {
              required: true,
              validate: (query) => validateQuery(query).valid,
            })}
            placeholder="Enter hash"
          />
          <Button
            type="submit"
            icon={SearchIcon}
            disabled={!isValid}
            loading={loading}
          >
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
