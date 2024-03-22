import React from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Banner from '../../Components/Banner/Banner';

const Home = () => {
    return (
        <div className='relative'>
            <div className='fixed w-full'>
                <NavBar />
            </div>
            <Banner />
        </div>
    );
};

export default Home;