import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Users } from './views';
import { Header } from './components/navbar';
import { Loading } from './components/Loading';
import { QueryClient, QueryClientProvider } from 'react-query';

import './index.css';
import App from './App';
import { queryClientConfig } from './util/constant';

const container = document.getElementById('root')!;
const root = createRoot(container);
const queryClient = new QueryClient(queryClientConfig)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<App/>} />
              <Route path='/users' element={<Users />} />
              {/* wild card route */}
              <Route path='*' element={<h2 className='text-center p-20 uppercase'>not found</h2>} /> 
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
