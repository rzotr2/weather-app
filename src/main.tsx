import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Theme } from "@radix-ui/themes";
import "./i18n";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Theme>
          <App />
      </Theme>
  </StrictMode>,
)
