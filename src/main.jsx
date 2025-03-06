import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'
import App from './App.jsx'
import UserContextProvider from './Context/userContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <UserContextProvider>
    <App />
        </UserContextProvider>
  </StrictMode>,
)
