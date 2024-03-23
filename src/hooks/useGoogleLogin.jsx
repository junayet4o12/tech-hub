// import React from 'react';


import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useGoogleLogin = () => {
    const navigate = useNavigate()
    const {  googleLogIn } = useAuth()
    const axiosPublic = useAxiosPublic();
    const handlegooglelogin = () => {
        
        googleLogIn()
            .then(res => {
                console.log(res.user);
                const userInfo = {
                    email: res?.user?.email,
                    name: res?.user?.displayName
                }
                navigate('/')
                // axiosPublic.post('/users', userInfo)
                //     .then(res => {
                //         console.log(res?.data);
                //         Swal.fire({
                //             title: "Logged in Successfully..",
                //             showClass: {
                //                 popup: `
                //         animate__animated
                //         animate__fadeInUp
                //         animate__faster
                //       `
                //             },
                //             hideClass: {
                //                 popup: `
                //         animate__animated
                //         animate__fadeOutDown
                //         animate__faster
                //       `
                //             }
                //         });
                //         navigate( '/')
                //     })


            })
            .catch(err => {
                console.log(err);
            })
    }
    return handlegooglelogin
};

export default useGoogleLogin;