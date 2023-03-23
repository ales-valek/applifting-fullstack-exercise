import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { queryClientConfig } from 'configs';

import Router from 'services/router';

import 'assets/styles/index.scss';

const queryClient = new QueryClient(queryClientConfig);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
