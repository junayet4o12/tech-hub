/* eslint-disable react/prop-types */
// import React from 'react';

import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRouts = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <div>loading</div>
    }
    if (user) {
        return <div>
            {children}
        </div>

    }
    return <Navigate to={'/login'}></Navigate>;
};

export default PrivateRouts;