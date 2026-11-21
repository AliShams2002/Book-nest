'use client';

import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Using useState to prevent the client from being recreated on every render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Must be greater than or equal to maxAge in Persister
            gcTime: 1000 * 60 * 60 * 24, // 24 ساعت
            staleTime: 60 * 1000,
          },
        },
      })
  );

  // Create the Persister only on the client side (since it has access to `window`)
  const [persister] = useState(() =>
    typeof window !== 'undefined'
      ? createSyncStoragePersister({
          storage: window.localStorage,
          key: 'TANSTACK_QUERY_CACHE',
        })
      : undefined
  );

  // Create the Persister only on the client side (since it has access to `window`)
  if (!persister) {
    return (
      <PersistQueryClientProvider client={queryClient}>
        {children}
      </PersistQueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
