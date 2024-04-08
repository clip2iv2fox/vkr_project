import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ClientPage.css';

const ClientPage = () => {
    // Состояние для открытого аккордеона заказа
    const [openOrderAccordion, setOpenOrderAccordion] = useState(null);

    // Мокап данных заказов
    const orders = [
        {
        id: 1,
        arrivalDate: '01.04.2024',
        deliveryDate: '15.04.2024',
        budget: '$1000',
        client: { id: 1, name: 'Клиент 1' },
        equipment: [
            { id: 101, serialNumber: 'SN001', type: 'Принтер' },
            { id: 102, serialNumber: 'SN002', type: 'Монитор' },
        ],
        },
        {
        id: 2,
        arrivalDate: '05.04.2024',
        deliveryDate: '20.04.2024',
        budget: '$1500',
        client: { id: 2, name: 'Клиент 2' },
        equipment: [
            { id: 103, serialNumber: 'SN003', type: 'Клавиатура' },
            { id: 104, serialNumber: 'SN004', type: 'Мышь' },
            { id: 105, serialNumber: 'SN005', type: 'Сканер' },
        ],
        },
        // Другие заказы...
    ];

    // Функция для переключения состояния аккордеона заказа
    const toggleOrderAccordion = (orderId) => {
        setOpenOrderAccordion(openOrderAccordion === orderId ? null : orderId);
    };

    return (
        <div className="client-page">
        <div className="client-info">
            <h1>Название компании</h1>
            <p>Контактное телефон: +1234567890</p>
            <p>Email: example@example.com</p>
            <p>Контактное ФИО: Иванов Иван Иванович</p>
        </div>
        <div className="order-table">
            <table>
            <thead>
                <tr>
                <th>ID заказа</th>
                <th>Дата привоза оборудования</th>
                <th>Дата сдачи</th>
                <th>Бюджет</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                <React.Fragment key={order.id}>
                    <tr onClick={() => toggleOrderAccordion(order.id)}>
                    <td>
                        <Link to={`/orders/${order.id}`}>{order.id}</Link>
                    </td>
                    <td>{order.arrivalDate}</td>
                    <td>{order.deliveryDate}</td>
                    <td>{order.budget}</td>
                    {openOrderAccordion === order.id ? '▲' : '▼'}
                    </tr>
                    {openOrderAccordion === order.id && (
                    <tr className="accordion" colSpan="4">
                        <td colSpan="4">
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Серийный номер</th>
                                <th>Тип оборудования</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order.equipment.map((equipment) => (
                                <tr key={equipment.id}>
                                <td>{equipment.id}</td>
                                <td>{equipment.serialNumber}</td>
                                <td>{equipment.type}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </td>
                    </tr>
                    )}
                </React.Fragment>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default ClientPage;
