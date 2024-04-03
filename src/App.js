import { useState } from 'react';
import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/header/header';
import Sidebar from './components/sidebar/Sidebar';
import LayOut from './components/layout/LayOut';
import StandPage from './pages/StandPage/StandPage';

const App = () => {
  const [userData, setUserData] = useState(null);

  const handleLogin = (data) => {
    setUserData(data);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/stand" element={<div><LayOut><StandPage/></LayOut></div>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path='/' element={<Login onLogin={() => handleLogin()}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
