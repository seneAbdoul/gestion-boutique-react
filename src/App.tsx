import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorPage from './utils/ErrorPage'
import '@fortawesome/fontawesome-free/css/all.min.css';
import SecureRouter from './pages/secure/SecureRouter';
import LoginPage from './pages/public/login/LoginPage';
import AuthGard from './services/utils/AuthGard';

function App() {
  return (
     <BrowserRouter>
         <Routes>
            <Route index element={<LoginPage/>} />
            <Route path='login' element={<LoginPage/>} />
            <Route element={<AuthGard/>}>
            <Route path='/boutique/*' element={<SecureRouter/>} />
            </Route>
            <Route path='*' element={<ErrorPage/>} />
         </Routes>
     </BrowserRouter>
  )
}

export default App
