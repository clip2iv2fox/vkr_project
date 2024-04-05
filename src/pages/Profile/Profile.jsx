import React from 'react';
import './Profile.css'

const Profile = () => {
    // Данные пользователя (замените эту информацию на реальные данные)
    const userData = {
        firstName: 'Иван',
        lastName: 'Иванов',
        email: 'ivan@example.com',
        phoneNumber: '123-456-7890',
        birthDate: '01.01.1990',
        login: 'ivanov',
        password: '********', // Не рекомендуется показывать пароль на странице
        avatar: 'https://via.placeholder.com/150' // URL к аватару пользователя
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
                    <p><strong>Пароль:</strong> {userData.password}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
