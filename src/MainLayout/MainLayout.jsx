import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';

const MainLayout = () => {
    return (
        <div className='relative'>
             <div className='fixed w-full z-10'>
                <NavBar />
            </div>
            <Outlet/>
        </div>
    );
};

export default MainLayout;