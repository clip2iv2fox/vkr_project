import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Label, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './DevicePage.css';

const DevicePage = () => {
    // Фейковые данные об оборудовании
    const [device, setDevice] = useState({
        type: 'Монитор',
        customer: { id: 1, name: 'Клиент 1' },
        serialNumber: 'SN001',
        lastMovement: 'Кабинет 101',
        employee: { id: 1, name: 'Иванов Иван Иванович' },
        arrivalDate: '01.04.2024',
        returnDate: '15.04.2024',
        testingProgress: 100, // Процент выполненного тестирования
        testingStatus: 'Завершено', // Статус тестирования
        testingHistory: [ // История тестирования
            { stage: 'Подготовка', percent: 0 },
            { stage: 'Экран', percent: 10, status: 'SUCCESS', criteria: [
                { name: 'Проверка наличия дефектов (пятна, битые пиксели, засветки).', status: 'SUCCESS' },
                { name: 'Проверка равномерности подсветки.', status: 'SUCCESS' },
                { name: 'Тестирование цветопередачи.', status: 'SUCCESS' }
            ] },
            { stage: 'Панель управления', percent: 30, status: 'SUCCESS', criteria: [
                { name: 'Проверка функциональности всех кнопок.', status: 'SUCCESS' },
                { name: 'Проверка работы джойстика или других элементов управления.', status: 'SUCCESS' }
            ] },
            { stage: 'Разъемы', percent: 60, status: 'WARNING', criteria: [
                { name: 'Тестирование функциональности каждого разъема (HDMI, DisplayPort, VGA, DVI).', status: 'WARNING' },
                { name: 'Проверка качества передачи сигнала.', status: 'SUCCESS' }
            ] },
            { stage: 'Питание и кабели связи', percent: 70, status: 'FAIL', criteria: [
                { name: 'Проверка работоспособности блока питания и кабелей.', status: 'FAIL' },
                { name: 'Проверка на отсутствие перегрева.', status: 'SUCCESS' }
            ] },
            { stage: 'Завершено' },
        ]
    });
    

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
            case 'SUCCESS': return '#00C49F'; // Зеленый
            case 'WARNING': return '#FFBB28'; // Желтый
            case 'FAIL': return '#FF0000'; // Красный
            default: return '#000000'; // Черный
        }
    };

    const totalStatus = (testingHistory) => {
        let overallStatus = 'SUCCESS'; // Предполагаемый общий статус по умолчанию
        let overallColor = '#00FF00'; // Зеленый цвет по умолчанию
    
        testingHistory.forEach(stage => {
            // Если для этапа тестирования указан статус 'FAIL', общий статус тоже становится 'FAIL' и цвет становится красным
            if (stage.status === 'FAIL') {
                overallStatus = 'FAIL';
                overallColor = '#FF0000';
            }
            // Если для этапа тестирования указан статус 'WARNING' и общий статус не 'FAIL', общий статус становится 'WARNING' и цвет становится желтым
            else if (stage.status === 'WARNING' && overallStatus !== 'FAIL') {
                overallStatus = 'WARNING';
                overallColor = '#FFFF00';
            }
        });
    
        return <div style={{ color: overallColor, fontSize: 20, fontWeight: 600 }}>{overallStatus}</div>
    };

    return (
        <div className="device-page">
            <div className="device-details">
                <div className="device-info">
                    <h2>{device.type}</h2>
                    <p><strong>Серийный номер:</strong> {device.serialNumber}</p>
                    <p><strong>Заказчик:</strong> <Link to={`/clients/${device.customer.id}`}>{device.customer.name}</Link></p>
                    <p><strong>Размещается:</strong> {device.lastMovement}</p>
                    <p><strong>Сотрудник:</strong> <Link to={`/employees/${device.employee.id}`}>{device.employee.name}</Link></p>
                    <p><strong>Дата прибытия:</strong> {device.arrivalDate}</p>
                    <p><strong>Дата обратной отправки:</strong> {device.returnDate}</p>
                    {device.testingStatus === 'Завершено' ? 
                        <p><strong>Результат тестирования:</strong> {totalStatus(device.testingHistory)}</p>
                    : ""
                    }
                </div>
                <div className="pie-chart">
                    <h3>Прогресс тестирования</h3>
                    <PieChart width={240} height={180}>
                        <Pie
                            data={[{ value: device.testingProgress }]}
                            dataKey="value"
                            cx={120}
                            cy={90}
                            startAngle={0}
                            endAngle={3.6 * device.testingProgress}
                            outerRadius={60}
                            fill="#8884d8"
                            label={(entry) => `${entry.value}%`}
                        >
                            <Cell key={`cell-0`} fill={getColor(device.testingProgress)} />
                        </Pie>
                    </PieChart>
                </div>
            </div>
            <div className="line-chart">
                <h3 className="device-details">История тестирования, статус: <div style={{ color: getStatusColor(device.testingStatus) }}>{device.testingStatus}</div></h3>
                <LineChart width={window.innerWidth / 1.5} height={300} data={device.testingHistory}>
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="percent" stroke="#8884d8" />
                </LineChart>
                <div className="testing-details">
                    <h3>Информация о тестировании:</h3>
                    <ul>
                        {device.testingHistory.map((stage, index) => stage.status && (
                            <li key={index} className="testing-history">
                                <strong className="device-details">{stage.stage} <div style={{ color: getStatusColor(stage.status) }}>{stage.status}</div></strong>
                                    <ul>
                                        {stage.criteria && stage.criteria.map((criterion, cIndex) => (
                                            <li key={cIndex} className="device-details">
                                                {criterion.name} - <div style={{ color: getStatusColor(criterion.status) }}>{criterion.status}</div>
                                            </li>
                                        ))}
                                    </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DevicePage;
