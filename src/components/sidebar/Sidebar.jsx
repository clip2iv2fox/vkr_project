import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({list = []}) => {
    return (
        <div className='sidebar'>
            <nav>
                <ul>
                    {list.map((li) => 
                        (<li className=''><Link to={li.link}>{li.name}</Link></li>)
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar