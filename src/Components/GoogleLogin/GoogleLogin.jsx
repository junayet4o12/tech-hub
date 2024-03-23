import React from 'react';
import { BiLogoGoogle } from 'react-icons/bi';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
    const {googleLogIn} = useAuth()
    const navigate = useNavigate()
    const handleGoogleLogin = () => {
        googleLogIn()
        .then(res=> {
            navigate('/') 
        })
        .catch(err=> {
            console.log(err);
        })
    }
    return (
        <p onClick={handleGoogleLogin}
        className='btn text-white  font-bold text-sm bg-primary/90 hover:bg-primary border-none hover:text-white login'>Log in with <span className="text-lg"><BiLogoGoogle></BiLogoGoogle></span></p>
    );
};

export default GoogleLogin;