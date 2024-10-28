import { DefaultError, type QueryFunction, type QueryKey, queryOptions, UseQueryOptions } from '@tanstack/react-query';

type CreateQueryOptions<
  TQueryFnData,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = {
  key: TQueryKey;
  fn: QueryFunction<TQueryFnData, TQueryKey, TError>;
  initialData?: any;
} & Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>;

export const createQueryOptions = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>({
  key,
  fn,
  ...props
}: CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>) => {
  return queryOptions({
    queryKey: key,
    queryFn: fn,
    refetchOnWindowFocus: false,
    staleTime: 0,
    ...props
  });
};
