import React, { useState } from 'react'
import './Login.css'
import Input from '../../components/input/input'
import Button from '../../components/button/button';
import { get } from '../../configs/axios_configs';

const Login = ({ onLogin }) => {
    const [login, isLogin] = useState("");
    const [password, isPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const validateLogin = (login) => {
        const regex = /^[a-zA-Z0-9_]{4,16}$/;
        return regex.test(login);
    }

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return regex.test(password);
    }

    const handleSingUp = async () => {
        if (!login || !password) {
            setErrorMessage("Пожалуйста, введите логин и пароль");
            return;
        }

        // Проверка корректности логина
        if (!validateLogin(login)) {
            setErrorMessage("Логин должен содержать только буквы, цифры и символы подчеркивания, длиной от 4 до 16 символов");
            return;
        }

        // Проверка корректности пароля
        if (!validatePassword(password)) {
            setErrorMessage("Пароль должен содержать минимум 8 символов, включая хотя бы одну букву верхнего и нижнего регистра, цифру и специальный символ");
            return;
        }

        try {
            const response = await get("users",{
                login: login,
                password: password
            });
            setErrorMessage("")
            onLogin(response.data);
        } catch (error) {
            setErrorMessage(error);
        }
    }

    return (
        <div className='login-page'>
            <div className='login-card'>
                <h1>Авторизация</h1>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <Input placeholder={"введите логин..."} input={(event) => isLogin(event)}/>
                <Input placeholder={"введите пароль..."} input={(event) => isPassword(event)}/>
                <div className='login-bottom'>
                    <Button onClick={() => handleSingUp()} children={"Войти"}/>
                </div>
            </div>
        </div>
    )
}

export default Login