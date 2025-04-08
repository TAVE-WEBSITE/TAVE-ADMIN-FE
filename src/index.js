import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
// import "./index.css";
import './styles/global.css';
//import App from "./App";
import Router from './core/router';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            {/* <App /> */}
            <Router />
        </React.StrictMode>
    </QueryClientProvider>
);
