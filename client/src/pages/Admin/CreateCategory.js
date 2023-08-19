import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Modal } from 'antd'
import CatrgoryForm from '../../components/Form/CatrgoryForm'
export default function CreateCategory() {
    const [categories, setcategories] = useState([])
    const [name, setname] = useState("")
    const [selected, setselected] = useState(null)
    const [updateName, setupdateName] = useState("")
    const [visible, setvisible] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name })
            if (data?.success) {
                toast.success(`${name} is created`)
                getAllcategories()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Wrong")
        }
    }
    const getAllcategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setcategories(data.category)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in geting catrgory")
        }
    }
    useEffect(() => {
        getAllcategories();
    }, [])
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updateName })
            if (data?.success) {
                toast.success(`${updateName} is updated`)
                setselected(null)
                setupdateName("")
                setvisible(false)
                getAllcategories()
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    const handleDelete = async (pid) => {

        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pid}`)
            if (data.success) {
                toast.success(`${name} is deleted`)

                getAllcategories()
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (

        <Layout title={"Dashboard-create category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>


                    <div className="col-md-9">
                        <h1>Manage category</h1>
                        <div className="p-3 w-50">
                            <CatrgoryForm handleSubmit={handleSubmit} value={name} setValue={setname} />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>

                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr>

                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button className="btn btn-primary ms-2" onClick={() => { setvisible(true); setupdateName(c.name); setselected(c) }}>Edit</button>
                                                    <button className="btn btn-danger ms-2" onClick={() => handleDelete(c._id)}>Delete</button>
                                                </td>


                                            </tr>
                                        </>
                                    ))}

                                </tbody>
                            </table>

                        </div>
                        <Modal onCancel={() => setvisible(false)} footer={null} visible={visible}>
                            <CatrgoryForm value={updateName} setValue={setupdateName} handleSubmit={handleUpdate} />
                        </Modal>

                    </div>
                </div>
            </div>
        </Layout>

    );
};
