import {
  DefaultError,
  QueryClient,
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  type UseQueryOptions
} from '@tanstack/react-query';

export const useGetQuery = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryOptions: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) => {
  return useQuery(queryOptions);
};

export const useMutationQuery = <TQueryFnData = unknown, TError = DefaultError, TVariables = void, TContext = unknown>(
  mutationOptions: UseMutationOptions<TQueryFnData, TError, TVariables, TContext>
) => {
  return useMutation(mutationOptions);
};

export const getPrefetchQuery = async <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryOptions: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};
