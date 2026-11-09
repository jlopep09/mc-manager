import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
import CommonLayout from './components/common/CommonLayout.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";
import Page404 from './components/common/Page404.jsx'
import Profile from './pages/Profile.jsx'
import InvalidPermissions from './components/common/InvalidPermissions.jsx'
import Dashboard from './pages/Dashboard.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Auth0Provider
              domain={import.meta.env.VITE_AUTH0_DOMAIN}
              clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
              authorizationParams={{
                redirect_uri: window.location.origin,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
              }}
            >
              <CommonLayout>
                <App />
              </CommonLayout>
            </Auth0Provider>
          } />
          <Route path="/dashboard" element={
            <Auth0Provider
              domain={import.meta.env.VITE_AUTH0_DOMAIN}
              clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
              authorizationParams={{
                redirect_uri: window.location.origin,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
              }}
            >
              <CommonLayout>
                <Dashboard />
              </CommonLayout>
            </Auth0Provider>
          } />
          <Route path="/profile" element={
            <Auth0Provider
              domain={import.meta.env.VITE_AUTH0_DOMAIN}
              clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
              authorizationParams={{
                redirect_uri: window.location.origin,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
              }}
            >
              <CommonLayout>
                <Profile />
              </CommonLayout>
            </Auth0Provider>
          } />
          <Route path="/InvalidPermissions" element={
            <Auth0Provider
              domain={import.meta.env.VITE_AUTH0_DOMAIN}
              clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
              authorizationParams={{
                redirect_uri: window.location.origin,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
              }}
            >
                <InvalidPermissions />
            </Auth0Provider>
          } />
          <Route path="*" element={<Page404 />} />
        </Routes>
        

     </BrowserRouter>
  </StrictMode>,
)
