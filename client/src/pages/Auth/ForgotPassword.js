
import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import "../../styles/AuthStyle.css"
import { useAuth } from '../../context/auth'



export default function ForgotPassword() {
    const [email, setemail] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [answer, setanswer] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', { email, answer, newpassword })
            if (res && res.data.success) {
                toast.success(res.data.message)

                navigate('/login')
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
            <Layout title={"Forgot Password"}>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h4 className="title">Reset Password</h4>


                        <div className="mb-3">

                            <input type="email" value={email}
                                onChange={(e) => setemail(e.target.value)}
                                className="htmlForm-control" id="exampleInputEmail1" placeholder='Enter your email' required />

                        </div>
                        <div className="mb-3">

                            <input type="text" value={answer}
                                onChange={(e) => setanswer(e.target.value)}
                                className="htmlForm-control" id="exampleInputEmail1" placeholder='Enter your School name' required />

                        </div>
                        <div className="mb-3">

                            <input type="password" value={newpassword}
                                onChange={(e) => setnewpassword(e.target.value)}
                                className="htmlForm-control" id="exampleInputPassword1" placeholder='Enter your password' required />
                        </div>


                        <button type="submit" className="btn btn-primary" onClick={() => { navigate('/login') }} >Reset</button>


                    </form>

                </div>
            </Layout>
        </div>
    );
};
