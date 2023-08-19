import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast'
import UserMenu from '../../components/Layout/UserMenu';
import { json } from 'react-router-dom';
export default function Profile() {
    //context
    const [auth, setauth] = useAuth()


    //state
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put('/api/v1/auth/profile', { name, email, password, phone, address })
            if (data?.error) {
                toast.error(data?.error)
            } else {
                setauth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem('auth')
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success("Profile updated successfully")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        const { email, name, phone, password, address } = auth.user
        setname(name)
        setphone(phone)
        setemail(email)
        setaddress(address)

    }, [auth.user])

    return (
        <Layout title={"your Profile"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">

                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <h4 className="title">User Profile</h4>

                                <div className="mb-3">

                                    <input type="text"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        className="htmlForm-control"
                                        id="exampleInputEmail1"
                                        placeholder='Enter your name'
                                    />

                                </div>
                                <div className="mb-3">

                                    <input type="email" value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        className="htmlForm-control" disabled id="exampleInputEmail1" placeholder='Enter your email' />

                                </div>
                                <div className="mb-3">

                                    <input type="password" value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        className="htmlForm-control" id="exampleInputPassword1" placeholder='Enter your password' />
                                </div>
                                <div className="mb-3">

                                    <input type="text" value={phone}
                                        onChange={(e) => setphone(e.target.value)}
                                        className="htmlForm-control" id="exampleInputEmail1" placeholder='Enter your phone no.' />

                                </div>
                                <div className="mb-3">

                                    <input type="text" value={address}
                                        onChange={(e) => setaddress(e.target.value)}
                                        className="htmlForm-control" id="exampleInputEmail1" placeholder='Enter your Address' />

                                </div>

                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
};
