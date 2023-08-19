import React from 'react'
import { NavLink } from 'react-router-dom';
//import CreateCategory from '../../pages/Admin/CreateCategory.js';


export default function AdminMenu() {
    return (
        <div className="text-center">
            <div className="list-group">

                <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create category</NavLink>
                <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product </NavLink>
                <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products </NavLink>
                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>


            </div>

        </div>




    );
};
