import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home"
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
          element: <div>all products</div>
        },
        {
          path: '/yourProducts',
          element: <div>your products</div>
        },
        {
          path: '/addProducts',
          element: <div>Add products</div>
        },
      ]
    },
  ]);

  export default MyRouts;