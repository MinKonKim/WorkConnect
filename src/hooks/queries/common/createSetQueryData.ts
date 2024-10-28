import { QueryKey, useQueryClient } from '@tanstack/react-query';

export const useCreateSetQueryData = () => {
  const queryClient = useQueryClient();

  return (queryKey: QueryKey, callback: unknown) => queryClient.setQueryData(queryKey, callback);
};
