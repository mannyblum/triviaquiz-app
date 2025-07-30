import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import TriviaQuizApp from "./components/TriviaQuizApp";

const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60, // 1 hour
});

export default function TriviaQuiz() {
  return (
    <QueryClientProvider client={queryClient}>
      <TriviaQuizApp />
    </QueryClientProvider>
  );
}
