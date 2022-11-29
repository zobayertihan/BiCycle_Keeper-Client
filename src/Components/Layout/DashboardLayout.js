import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/users/useAdmin/useAdmin';
import useBuyer from '../../Hooks/users/useBuyer/useBuyer';
import useSeller from '../../Hooks/users/useSeller/useSeller';
import { AuthContext } from '../Contexts/AuthProvider';
import Header from '../Shared/Header/Header';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isBuyer] = useBuyer(user?.email);
    const [isSeller] = useSeller(user?.email);
    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {
                            isAdmin && <>
                                <li><Link to="/dashboard/allseller">All seller</Link></li>
                                <li><Link to="/dashboard/allbuyer">All buyer</Link></li>
                                <li><Link to="/dashboard/allreportedproducts">All Reported Products</Link></li>
                            </>
                        }
                        {
                            isBuyer && <>
                                <li><Link to="/dashboard/allorders">My Orders</Link></li>
                            </>
                        }
                        {
                            isSeller && <>
                                <li><Link to="/dashboard/allproducts">All Products</Link></li>
                                <li><Link to="/dashboard/addproduct">Add A Product</Link></li>

                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;