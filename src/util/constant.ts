import { QueryClientConfig } from "react-query";

export const queryClientConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            enabled: true,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 5,
            retry: 2,
            retryDelay: 1000,
            refetchInterval: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
        }
    }
}