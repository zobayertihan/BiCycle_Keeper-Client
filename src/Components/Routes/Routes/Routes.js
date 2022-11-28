import AllBuyer from "../../Dashboard/AllUsers/AllBuyer";
import AllSeller from "../../Dashboard/AllUsers/AllSeller";
import AllOrders from "../../Dashboard/Buyer/AllOrders";
import Home from "../../Home/Home/Home";
import DashboardLayout from "../../Layout/DashboardLayout";
import Products from "../../Products/Products/Products";
import AddProduct from "../../Seller/AddProduct/AddProduct";
import AllProducts from "../../Seller/AllProducts/AllProducts";
import Login from "../../User/Login/Login";
import Signup from "../../User/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "../usersRoute/AdminRoute/AdminRoute";
import BuyerRoute from "../usersRoute/BuyerRoute/BuyerRoute";
import SellerRoute from "../usersRoute/SellerRoute/SellerRoute";

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
                path: `/catagory/:catagory`,
                element: <PrivateRoute><Products></Products></PrivateRoute>,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/allseller',
                element: <AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            {
                path: '/dashboard/allbuyer',
                element: <AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },
            {
                path: '/dashboard/allproducts',
                element: <SellerRoute><AllProducts></AllProducts></SellerRoute>
            },
            {
                path: '/dashboard/allorders',
                element: <BuyerRoute><AllOrders></AllOrders></BuyerRoute>
            }
        ]
    }
])