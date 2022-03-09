
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);

