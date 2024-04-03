import React from 'react'
import Header from '../header/header'
import Sidebar from '../sidebar/Sidebar'

const LayOut = ({list, info, children}) => {
    return (
        <div className='layout'>
            <Header info={info}/>
            <div className='main'>
                <Sidebar list={list}/>
                {children}
            </div>
        </div>
    )
}

export default LayOut