import React, { useState } from 'react'
import Header from '../header/header'
import Sidebar from '../sidebar/Sidebar'
import './LayOut.css'

const LayOut = ({list, info, children}) => {
    return (
        <div className='layout'>
            <Header info={info}/>
            <div className='page'>
                <Sidebar list={list}/>
                <div className='page-content'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default LayOut