import { useState } from 'react';
import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayOut from './components/layout/LayOut';
import StandPage from './pages/StandPage/StandPage';
import Profile from './pages/Profile/Profile';
import Users from './pages/Users/Users';
import OrderList from './pages/OrderList/OrderList';
import ClientPage from './pages/ClientPage/ClientPage';
import OrderPage from './pages/OrderPage/OrderPage';
import UserPage from './pages/UserPage/UserPage';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [list, isList] = useState([
    {
      link: "/stand",
      name: "stand1 ",
      component: <StandPage/>
    },
    {
      link: "/orders",
      name: "Заказы ",
      component: <OrderList/>
    },
    {
      link: "/employees",
      name: "Сотрудники ",
      component: <Users/>
    },
    {
      link: "/account",
      name: "Аккаунт ",
      component: <Profile/>
    },
  ])
  const [multy_list, isMulty_list] = useState([
    {
      link: "/clients",
      component: <ClientPage/>
    },
    {
      link: "/orders",
      component: <OrderPage/>
    },
    {
      link: "/employees",
      component: <UserPage/>
    },
  ])
  const handleLogin = (data) => {
    setUserData(data);
  }

  return (
    <BrowserRouter>
      <Routes>
        {
          list.map((page) =>
            <Route path={page.link} element={
              <LayOut list={list}>
                {page.component}
              </LayOut>
            }/>
          )
        }
        {
          multy_list.map((page) =>
            <Route path={page.link}>
              <Route path=":id" element={
                <LayOut list={list}>
                  {page.component}
                </LayOut>
                }
              />
            </Route>
          )
        }
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path='/' element={<Login onLogin={() => handleLogin()}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
