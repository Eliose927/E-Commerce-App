import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import { useCart } from '../../context/cart'
import useCategory from '../../hooks/useCategory'
import SearchInput from '../Form/SearchInput'
import { Badge } from 'antd'
export default function Header() {
    const [auth, setauth] = useAuth()
    const [cart] = useCart()
    const categories = useCategory()
    const handleLogout = () => {
        setauth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth')
        toast.success("Logout successful")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/"><AiOutlineShoppingCart /> Ecommerce App </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to={"/categories"}>
                                        Categories
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to={"/categories"}>All categories</Link>
                                        </li>
                                        {categories.map((c) => (

                                            <li>

                                                <Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link>
                                            </li>


                                        ))}
                                    </ul>

                                </li>

                            </li>

                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                </>) : (<>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink></li>
                                            <li><NavLink onClick={handleLogout} className="dropdown-item" to="/login">Logout</NavLink></li>
                                        </ul>
                                    </li>



                                </>)
                            }
                            <li className="nav-item">
                                <Badge count={cart?.length} showZero>
                                    <NavLink className="nav-link" to="/cart">
                                        Cart
                                    </NavLink>
                                </Badge>

                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

        </>
    );
};
