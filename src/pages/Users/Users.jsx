import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Users.css';

const Users = () => {
    // Фейковые данные о сотрудниках
    const employees = [
            {
            id: 1,
            name: 'Иванов Иван Иванович',
            position: "administrator"
        }
    ];

    const navigate = useNavigate();

    const handleRowClick = (employeeId) => {
        navigate(`/employees/${employeeId}`);
    };

    return (
        <div className="users-page">
            <h2>Список сотрудников</h2>
            <table>
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Должность</th>
                    </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id} onClick={() => handleRowClick(employee.id)}>
                        <td>{employee.name}</td>
                        <td>{employee.position}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;