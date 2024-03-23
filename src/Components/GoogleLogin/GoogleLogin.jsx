import { BiLogoGoogle } from 'react-icons/bi';
import useGoogleLogin from '../../hooks/useGoogleLogin';

const GoogleLogin = () => {
    const handleGoogleLogin = useGoogleLogin()
  
    return (
        <p onClick={handleGoogleLogin}
        className='btn text-white  font-bold text-sm bg-primary/90 hover:bg-primary border-none hover:text-white login'>Log in with <span className="text-lg"><BiLogoGoogle></BiLogoGoogle></span></p>
    );
};

export default GoogleLogin;