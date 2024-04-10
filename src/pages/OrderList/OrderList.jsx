import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './OrderList.css';

const OrderList = () => {
    // Состояние для открытого аккордеона заказа
    const [openOrderAccordion, setOpenOrderAccordion] = useState(null);
    // Фейковые данные о заказах
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

    const navigate = useNavigate();

    // Функция для переключения состояния аккордеона заказа
    const toggleOrderAccordion = (orderId) => {
        setOpenOrderAccordion(openOrderAccordion === orderId ? null : orderId);
    };

    const handleRowClick = (path) => {
        navigate(`/devices/${path}`);
    };

    return (
        <div className="order-list">
        <h2>Список заказов</h2>
        <table>
            <thead>
            <tr>
                <th>ID заказа</th>
                <th>Дата привоза</th>
                <th>Дата сдачи</th>
                <th>Бюджет</th>
                <th>Заказчик</th>
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
                    <td>
                    <Link to={`/clients/${order.client.id}`}>{order.client.name}</Link>
                    </td>
                    {openOrderAccordion === order.id ? '▲' : '▼'}
                </tr>
                {openOrderAccordion === order.id && (
                    <tr className="order-details" colSpan="5">
                        <td colSpan="5">
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
                                    <tr key={equipment.id} onClick={() => handleRowClick(equipment.serialNumber)}>
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
    );
};

export default OrderList;
