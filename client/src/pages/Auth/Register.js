import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import "../../styles/AuthStyle.css"

export default function Register() {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const [answer, setanswer] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/register', { name, email, password, phone, address, answer })
            if (res && res.data.success) {
                toast.success(res.data.message)
                // alert("Registered Successfully")
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
        <Layout title={"Register"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Register page</h4>

                    <div className="mb-3">

                        <input type="text"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            className="htmlForm-control"
                            id="exampleInputEmail1"
                            placeholder='Enter your name'
                            required />

                    </div>
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

                        <input type="text" value={phone}
                            onChange={(e) => setphone(e.target.value)}
                            className="htmlForm-control" id="exampleInputEmail1" placeholder='Enter your phone no.' required />

                    </div>
                    <div className="mb-3">

                        <input type="text" value={address}
                            onChange={(e) => setaddress(e.target.value)}
                            className="htmlForm-control" id="exampleInputEmail1" placeholder='Enter your Address' required />

                    </div>
                    <div className="mb-3">

                        <input type="text" value={answer}
                            onChange={(e) => setanswer(e.target.value)}
                            className="htmlForm-control" id="exampleInputEmail1" placeholder='Enter your school name' required />

                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    );
};
