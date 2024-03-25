import React, { useState } from 'react';
import bannerImg from '../../assets/bannerImg.jpg'
import WarningModal from './WarningModal';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const Banner = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const { user } = useAuth()
    const handleOpen = () => {
        if (user) {
            navigate('/addProduct')
        }
        else {
            setOpen(true);

        }
    }
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${bannerImg})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-medium">Welcome To <br /> <span className='font-bold text-primary'>Tech Hub</span></h1>
                        <p className="mb-5">Tech Hub simplifies tech enthusiasts' experience by providing a user-friendly platform for adding, updating, and managing tech-related Products. Join us today!</p>
                        <button onClick={() => handleOpen()} className="btn btn-primary bg-primary/80 border-none hover:bg-primary">Add Product</button>
                    </div>
                </div>
            </div>
            <WarningModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default Banner;