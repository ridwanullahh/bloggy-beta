import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/modern-design-system.css'
import './lib/db-init'

createRoot(document.getElementById("root")!).render(<App />);
