import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <Router>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </Router>
        </RecoilRoot>
    </React.StrictMode>,
  document.getElementById('root')
);