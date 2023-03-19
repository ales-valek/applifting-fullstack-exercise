import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from 'services/router';

import 'assets/styles/index.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
