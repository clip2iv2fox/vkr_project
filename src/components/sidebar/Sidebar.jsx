import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ list = [] }) => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <nav>
                <ul>
                {list.map((li) => (
                    <li key={li.link} className={location.pathname === li.link ? 'active' : ''}>
                    <Link to={li.link}>{li.name}</Link>
                    </li>
                ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
