import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
    const [users, setUsers] = useState([
        {
            "id": 1,
            "photo": "",
            "name": "Иванов Иван Иванович",
            "position": "Технический сотрудник",
            "contact": "+123456789",
            "equipment": [
                {
                    "id": 1,
                    "serialNumber": "SN001",
                    "name": "Принтер",
                    "type": "Принтер",
                    "location": "Кабинет 101",
                    "testingStatus": "Протестирован"
                },
                {
                    "id": 2,
                    "serialNumber": "SN002",
                    "name": "Сканер",
                    "type": "Сканер",
                    "location": "Кабинет 102",
                    "testingStatus": "Протестирован"
                }
            ],
            "orders": []
        }
    ])
    const { id } = useParams();
    const user = users.find(user => user.id === parseInt(id));
    const navigate = useNavigate();

    const handleRowClick = (path) => {
        navigate(path);
    };

    if (!user) {
        return <div>Пользователь не найден</div>;
    }

    return (
        <div className="user-page">
            <div className="user-details">
                <div className="user-info">
                    <img src={user.photo} alt="Фото пользователя" />
                    <div className='content'>
                        <h2>{user.name}</h2>
                        <p>Должность: {user.position}</p>
                        <p>Контактный телефон: {user.contact}</p>
                    </div>
                </div>
                {user.position === 'Технический сотрудник' && (
                    <div className="equipment-table">
                        <h3>Оборудование, с которым работает:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Серийный номер</th>
                                    <th>Название</th>
                                    <th>Тип</th>
                                    <th>Местоположение</th>
                                    <th>Статус тестирования</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.equipment.map(equipment => (
                                    <tr key={equipment.id} onClick={() => handleRowClick(`/devices/${equipment.serialNumber}`)}>
                                        <td>{equipment.serialNumber}</td>
                                        <td>{equipment.name}</td>
                                        <td>{equipment.type}</td>
                                        <td>{equipment.location}</td>
                                        <td>{equipment.testingStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {(user.position === 'Администратор' || user.position === 'Менеджер') && (
                    <div className="orders-table">
                        <h3>Заказы, с которыми работает:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID заказа</th>
                                    <th>Клиент</th>
                                    <th>Дата прибытия</th>
                                    <th>Дата доставки</th>
                                    <th>Бюджет</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.orders.map(order => (
                                    <tr key={order.id} onClick={() => handleRowClick(`/orders/${order.id}`)}>
                                        <td>{order.id}</td>
                                        <td>{order.client}</td>
                                        <td>{order.arrivalDate}</td>
                                        <td>{order.deliveryDate}</td>
                                        <td>{order.budget}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPage;
