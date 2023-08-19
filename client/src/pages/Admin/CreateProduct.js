import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
const { Option } = Select

export default function CreateProduct() {
    const navigate = useNavigate()
    const [categories, setcategories] = useState([])
    const [photo, setphoto] = useState("")
    const [name, setname] = useState("")
    const [category, setcategory] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [quantity, setquantity] = useState("")
    const [shipping, setshipping] = useState("")
    const getAllcategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setcategories(data?.category)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in geting catrgory")
        }
    }
    useEffect(() => {
        getAllcategories();
    }, [])
    //create prod func
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)
            const { data } = axios.post('/api/v1/product/create-product', productData)
            if (data?.success) {
                toast.error(data?.message)

            } else {
                toast.success("Product created successfully")
                navigate('/dashboard/admin/products')
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout title={"Dashboard- Create Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            <Select bordered={false} placeholder="Select category" size="large" showSearch className="form-select mb-3" onChange={(value) => { setcategory(value) }}>
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}>{c.name}</Option>
                                ))}

                            </Select>
                            <div className="mb-3">
                                <label htmlFor="Upload inages" className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type="file" name="photo" accept="image/*" onChange={(e) => setphoto(e.target.files[0])} />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className="img img-responsive" />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type="text" value={name} placeholder="Write a name" className="form-control" onChange={(e) => setname(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={description} placeholder="Write a description" className="form-control" onChange={(e) => setdescription(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={price} placeholder="Write a Price" className="form-control" onChange={(e) => setprice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={quantity} placeholder="Write a Quantity" className="form-control" onChange={(e) => setquantity(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <Select bordered={false} placeholder="Select Shipping" size="large" showSearch className="form-select mb-3" onChange={(value) => {
                                    setshipping(value)
                                }}>
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>

                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>Create product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
