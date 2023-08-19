import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import "../../styles/AuthStyle.css"
import { useAuth } from '../../context/auth'



export default function Login() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [auth, setauth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", { email, password });
            if (res && res.data.success) {
                toast.success(res.data.message)
                setauth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });

                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state || "/")
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <div>
            <Layout title={"Register"}>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h4 className="title">Login Form</h4>


                        <div className="mb-3">

                            <input type="email" value={email}
                                onChange={(e) => setemail(e.target.value)}
                                className="htmlForm-control" id="exampleInputEmail1" placeholder='Enter your email' required />

                        </div>
                        <div className="mb-3">

                            <input type="password" value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                className="htmlForm-control" id="exampleInputPassword1" placeholder='Enter your password' required />
                        </div>

                        <div className="mb-3">
                            <button type="button" className="btn btn-primary" onClick={() => { navigate('/forgot-password') }}>Forgot Password</button>
                        </div>

                        <button type="submit" className="btn btn-primary" >Login</button>


                    </form>

                </div>
            </Layout>
        </div>
    );
};
//onClick={() => { navigate('/') }}