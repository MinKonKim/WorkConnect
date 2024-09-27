'use client';

import { StrictPropsWithChildren } from '@/types/common';
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const newQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000
    }
  }
});

let browserQueryClient: QueryClient | undefined = undefined;

const getQeuryClient = () => {
  if (isServer) {
    return newQueryClient;
  } else {
    if (!browserQueryClient) browserQueryClient = newQueryClient;
    return browserQueryClient;
  }
};

const QueryProvider = ({ children }: StrictPropsWithChildren) => {
  const queryClient = getQeuryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default QueryProvider;
