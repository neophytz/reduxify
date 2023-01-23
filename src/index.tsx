import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dadda } from './views';
import { Header } from './components/navbar';

import './index.css';
import { Loading } from './components/Loading';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path='/dadda' element={<Dadda />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
