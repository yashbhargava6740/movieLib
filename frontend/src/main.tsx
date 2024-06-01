
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById('root')!).render(
    <div 
    className="bg-cover bg-center min-h-screen"
    style={{ backgroundImage: `url('/img.jpg')` }}
    >
    <App />
    <Toaster/>
    </div>
)
