import React, { useState } from 'react';
import './Users.css';

const Users = () => {
    // Состояние для открытого аккордеона сотрудника
    const [openEmployeeAccordion, setOpenEmployeeAccordion] = useState(null);
    // Состояние для открытого аккордеона заказа
    const [openOrderAccordion, setOpenOrderAccordion] = useState(null);

    // Фейковые данные о сотрудниках
    const employees = [
        {
        id: 1,
        name: 'Иванов Иван Иванович',
        login: 'ivanov_ii',
        password: 'qwerty',
        orders: [
            {
            id: 101,
            date: '01.04.2024',
            equipment: [
                { id: 1, name: 'Принтер', location: 'Кабинет 101' },
                { id: 2, name: 'Сканер', location: 'Кабинет 102' },
            ],
            },
            {
            id: 102,
            date: '02.04.2024',
            equipment: [
                { id: 3, name: 'Клавиатура', location: 'Кабинет 103' },
                { id: 4, name: 'Мышь', location: 'Кабинет 104' },
                { id: 5, name: 'Монитор', location: 'Кабинет 105' },
            ],
            },
        ],
        },
        // Другие сотрудники...
    ];

    // Функция для переключения состояния аккордеона сотрудника
    const toggleEmployeeAccordion = (id) => {
        setOpenEmployeeAccordion(openEmployeeAccordion === id ? null : id);
    };

    // Функция для переключения состояния аккордеона заказа
    const toggleOrderAccordion = (orderId) => {
        setOpenOrderAccordion(openOrderAccordion === orderId ? null : orderId);
    };

    return (
        <div className="users-page">
        <h2>Список сотрудников</h2>
        <table>
            <thead>
            <tr>
                <th>ФИО</th>
                <th>Логин</th>
                <th>Пароль</th>
            </tr>
            </thead>
            <tbody>
            {employees.map((employee) => (
                <React.Fragment key={employee.id}>
                <tr onClick={() => toggleEmployeeAccordion(employee.id)}>
                    <td>{employee.name}</td>
                    <td>{employee.login}</td>
                    <td>{employee.password}</td>
                </tr>
                {openEmployeeAccordion === employee.id &&
                    employee.orders.map((order) => (
                    <React.Fragment key={order.id}>
                        <tr className="order" onClick={() => toggleOrderAccordion(order.id)}>
                        <td colSpan="3">{order.date}</td>
                        </tr>
                        {openOrderAccordion === order.id &&
                        order.equipment.map((equipment) => (
                            <tr className="equipment" key={equipment.id}>
                            <td colSpan="3">
                                ID: {equipment.id}, Название: {equipment.name}, Размещение: {equipment.location}
                            </td>
                            </tr>
                        ))}
                    </React.Fragment>
                    ))}
                </React.Fragment>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default Users;
