import { useState } from 'react';
import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [userData, setUserData] = useState(null);

  // Функция обратного вызова для передачи данных пользователя из Login.js в App.js
  const handleLogin = (data) => {
    setUserData(data);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path='/' element={<Login onLogin={() => handleLogin()}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
