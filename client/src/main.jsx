import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import store from './redux/store.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <ToastContainer position="top-right" hideProgressBar={true} pauseOnFocusLoss={false} autoClose={2000} />
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
