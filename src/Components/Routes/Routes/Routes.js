import Home from "../../Home/Home/Home";
import AddProduct from "../../Seller/AddProduct/AddProduct";
import Login from "../../User/Login/Login";
import Signup from "../../User/Signup/Signup";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/addproduct',
                element: <AddProduct></AddProduct>
            }
        ]
    }
])