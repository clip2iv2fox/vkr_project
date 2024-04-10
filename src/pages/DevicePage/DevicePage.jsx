import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Label, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './DevicePage.css';

const DevicePage = () => {
    // Фейковые данные об оборудовании
    const device = {
        type: 'Монитор',
        customer: { id: 1, name: 'Клиент 1' },
        serialNumber: 'SN001',
        lastMovement: 'Кабинет 101',
        employee: { id: 1, name: 'Иванов Иван Иванович' },
        arrivalDate: '01.04.2024',
        returnDate: '15.04.2024',
        testingProgress: 70, // Процент выполненного тестирования
        testingStatus: 'Тестирование', // Статус тестирования
        testingHistory: [ // История тестирования
            { stage: 'Подготовка', percent: 0 },
            { stage: 'Тестирование', percent: 50 },
            { stage: 'Анализ результатов', percent: 80 },
            { stage: 'Завершено', percent: 100 },
        ]
    };

    // Цвета для PieChart в зависимости от прогресса тестирования
    const getColor = (progress) => {
        if (progress < 40) return '#FF8042'; // Красный
        if (progress < 60) return '#FFBB28'; // Желтый
        if (progress < 90) return '#00C49F'; // Синий
        return '#0088FE'; // Зеленый
    };

    // Цвета для статуса тестирования
    const getStatusColor = (status) => {
        switch (status) {
            case 'Не отвечает': return '#808080'; // Серый
            case 'Действие':
            case 'Тестирование': return '#0000FF'; // Синий
            case 'Ошибка': return '#FF0000'; // Красный
            case 'Завершено': return '#00FF00'; // Зеленый
            default: return '#000000'; // Черный
        }
    };

    return (
        <div className="device-page">
            <div className="device-details">
                <div className="device-info">
                    <h2>{device.type}</h2>
                    <p><strong>Серийный номер:</strong> {device.serialNumber}</p>
                    <p><strong>Заказчик:</strong> <Link to={`/clients/${device.customer.id}`}>{device.customer.name}</Link></p>
                    <p><strong>Последнее перемещение:</strong> {device.lastMovement}</p>
                    <p><strong>Сотрудник:</strong> <Link to={`/employees/${device.employee.id}`}>{device.employee.name}</Link></p>
                    <p><strong>Дата прибытия:</strong> {device.arrivalDate}</p>
                    <p><strong>Дата обратной отправки:</strong> {device.returnDate}</p>
                </div>
                <div className="pie-chart">
                    <h3>Прогресс тестирования</h3>
                    <PieChart width={250} height={230}>
                        <Pie
                            data={[{ value: device.testingProgress }]}
                            dataKey="value"
                            cx={120}
                            cy={120}
                            startAngle={0}
                            endAngle={3.6 * device.testingProgress}
                            outerRadius={80}
                            fill="#8884d8"
                            label={(entry) => `${entry.value}%`}
                        >
                            <Cell key={`cell-0`} fill={getColor(device.testingProgress)} />
                        </Pie>
                    </PieChart>
                </div>
            </div>
            <div className="line-chart">
                <h3>История тестирования, статус: <div style={{ color: getStatusColor(device.testingStatus) }}>{device.testingStatus}</div></h3>
                <LineChart width={500} height={300} data={device.testingHistory}>
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="percent" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
};

export default DevicePage;
