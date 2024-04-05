import { useState } from 'react';
import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayOut from './components/layout/LayOut';
import StandPage from './pages/StandPage/StandPage';
import Profile from './pages/Profile/Profile';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [list, isList] = useState([
    {
      link: "/stand",
      name: "stand1 "
    }
  ])

  const handleLogin = (data) => {
    setUserData(data);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/stand" element={
          <LayOut list={list}>
            <StandPage/>
          </LayOut>
        }/>
        <Route path="/profile" element={
          <LayOut list={list}>
            <Profile/>
          </LayOut>
        }/>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path='/' element={<Login onLogin={() => handleLogin()}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
