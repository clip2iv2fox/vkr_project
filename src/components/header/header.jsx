import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import './header.css';
import Button from '../button/button';

const Header = () => {
  const [dark, setDark] = useState(true);

  const toggleDarkMode = () => {
    setDark(!dark);
    document.body.classList.toggle('dark-theme', dark);
  };

  return (
    <div className="header">
      <div className="title">
        Тест ИС
      </div>
      <div className='header-right'>
        <Button type={"default"}>выход</Button>
        <Link to="/account" className="icon">
          <i className='fa fa-paper-plane' style={{fontSize: '25px', color:'white', opacity: '70%'}}></i>
        </Link>
      </div>
    </div>
  );
};

export default Header;
