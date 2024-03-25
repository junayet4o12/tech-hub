import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home"
import LogIn from "../Pages/LogIn/LogIn";
import Register from "../Pages/Register/Register";
import PrivateRouts from "../PrivateRouts/PrivateRouts";
import AddProduct from "../Components/AddProduct/AddProduct";
import AllProducts from "../Components/AllProducts/AllProducts";
import UserProduct from "../Components/UserProduct/UserProduct";
import UpdateProduct from "../Components/UpdateProduct/UpdateProduct";
const MyRouts = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/allProducts',
        element: <AllProducts />
      },
      {
        path: '/yourProducts',
        element: <PrivateRouts><UserProduct /></PrivateRouts>
      },
      {
        path: '/addProduct',
        element: <PrivateRouts><AddProduct /></PrivateRouts>
      },
      {
        path: '/updateProduct/:id',
        element: <PrivateRouts><UpdateProduct/></PrivateRouts>
      },
      {
        path: '/login',
        element: <LogIn></LogIn>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
    ]
  },
]);

export default MyRouts;