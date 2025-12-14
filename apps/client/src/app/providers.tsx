"use client";

import { ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState, // 타입 추가
} from "@tanstack/react-query";
import { Toast } from "@ui/components";

export default function Providers({
  children,
  state,
}: {
  children: ReactNode;
  state?: DehydratedState;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 2,
            staleTime: 60 * 1000,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state}>
        {children}
        <Toast />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
