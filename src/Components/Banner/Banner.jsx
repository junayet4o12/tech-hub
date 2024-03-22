import React from 'react';
import bannerImg from '../../assets/bannerImg.jpg'
const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${bannerImg})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-medium">Welcome To <br /> <span className='font-bold'>Tech Hub</span></h1>
                        <p className="mb-5">Tech Hub simplifies tech enthusiasts' experience by providing a user-friendly platform for adding, updating, and managing tech-related content. Join us today!</p>
                        <button className="btn btn-primary bg-primary/80 border-none hover:bg-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;