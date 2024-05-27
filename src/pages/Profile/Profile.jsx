import React, { useState } from 'react';
import avatar from '../../public/person.jpg'
import './Profile.css';

const Profile = () => {
    // Данные пользователя (замените эту информацию на реальные данные)
    const userData = {
        firstName: 'Иван',
        lastName: 'Извеков',
        email: 'ivan@example.com',
        phoneNumber: '123-456-7890',
        birthDate: '01.01.1990',
        login: 'iizvekov',
        password: '12345', // Не рекомендуется показывать пароль на странице
        avatar: avatar // URL к аватару пользователя
    };

    // Состояние для отображения пароля
    const [showPassword, setShowPassword] = useState(false);

    // Функция для переключения отображения пароля
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Функция для замены символов пароля на звездочки
    const getPasswordDisplay = () => {
        return showPassword ? userData.password : '*'.repeat(userData.password.length);
    };

    return (
        <div className="user-profile">
            <h2>Профиль пользователя</h2>
            <div className="user-info">
                <div className="avatar">
                    <img src={userData.avatar} alt="Аватар пользователя" />
                    <h3>{userData.firstName} {userData.lastName}</h3>
                </div>
                <div className="details">
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Телефон:</strong> {userData.phoneNumber}</p>
                    <p><strong>Дата рождения:</strong> {userData.birthDate}</p>
                    <p><strong>Логин:</strong> {userData.login}</p>
                    {/* Не рекомендуется показывать пароль на странице */}
                    <p className='password' onClick={togglePasswordVisibility}><strong>Пароль:</strong> {getPasswordDisplay()}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
