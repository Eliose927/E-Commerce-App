import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import Item from 'antd/es/list/Item';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import toast, { Toast } from 'react-hot-toast';
export default function CartPage() {
    const [cart, setcart] = useCart()
    const [auth, setauth] = useAuth()
    const navigate = useNavigate()
    const [clientToken, setclienttoken] = useState("")
    const [instance, setinstance] = useState("")
    const [loading, setloading] = useState(false)
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(Item => Item._id === pid)
            myCart.splice(index, 1)
            setcart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }

    const totalPrice = () => {
        try {
            let total = 0
            cart?.map(item => { total = total + item.price })
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })
        } catch (error) {
            console.log(error)
        }
    }

    //get payment gettoken
    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token')
            setclienttoken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getToken()
    }, [auth?.token])

    const handlePayment = async () => {
        try {
            setloading(true)
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post('/api/v1/product/braintree/payment', {
                nonce, cart
            })
            setloading(false)
            localStorage.removeItem('cart')
            setcart([])
            navigate('/dashboard/user/orders')
            toast.success("Payment completed succesfully!")
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    };
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length > 1 ? ` you have ${cart.length} items in your cart ${auth?.token ? "" : "Please login to checkout"}` : "your cart is empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            {
                                cart?.map(p => (
                                    <div className="row mb-2 p-3 card flex-row">
                                        <div className="col-md-4">
                                            <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}
                                                width={"100px"} height={"100px"} />
                                        </div>
                                        <div className="col-md-8">
                                            <h4>{p.name}</h4>
                                            <p>{p.description.substring(0, 30)}</p>
                                            <p>Price : {p.price}</p>
                                            <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total:{totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className="btn btn-outline-warning"
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {
                                    auth?.token ? (
                                        <button className="btn btn-outline-warning" onClick={() => navigate('/dashboard/user/profile')}>
                                            Update Address
                                        </button>
                                    ) : (
                                        <button className="btn btn-outline-warning" onClick={() => navigate('/login', {
                                            state: '/cart',
                                        })}>Please login to checkOut</button>
                                    )
                                }
                            </div>
                        )}
                        <div className="mt-2">
                            {
                                !clientToken || !auth?.token || !cart?.length ? (

                                    ""

                                ) : (
                                    <>

                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                },
                                            }}
                                            onInstance={(instance) => setinstance(instance)}
                                        />
                                        <button className="btn btn-primary" onClick={handlePayment} disabled={loading || !instance || auth?.user?.address} >
                                            {loading ? "processing..." : "Make payment"}
                                        </button>
                                    </>
                                )
                            }


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
