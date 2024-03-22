import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import MyRouts from './MyRouts/MyRouts';
import AuthProviders from './AuthProviders/AuthProviders';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
      <RouterProvider router={MyRouts} />
    </AuthProviders>
  </React.StrictMode>,
)
