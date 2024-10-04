import { QueryKey, useQueryClient } from '@tanstack/react-query';

export const useCreateInvalidateQueries = () => {
  const queryClient = useQueryClient();

  return (queryKey: QueryKey) => queryClient.invalidateQueries({ queryKey: queryKey });
};
