import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast'
export default function HomePage() {
    const [cart, setcart] = useCart()
    const [checked, setchecked] = useState([])
    const [products, setproducts] = useState([])
    const [categories, setcategories] = useState([])
    const [radio, setradio] = useState([])
    const [total, settotal] = useState(0)
    const [page, setpage] = useState(1)
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    //get total count
    const getTotal = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/product-count')
            settotal(data?.total)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getTotal()
    }, [])
    const loadMore = async () => {
        try {
            setloading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            setloading(false)
            setproducts([...products, ...data?.products])
        } catch (error) {
            console.log(error)
            setloading(false)

        }
    }
    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])

    const getAllcategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setcategories(data.category)
            }
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getAllcategories();
    }, [])
    const getAllProducts = async () => {
        try {
            setloading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            setloading(false)
            setproducts(data.products)
        } catch (error) {
            setloading(false)
            console.log(error)
        }
    }

    //filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter(c => c !== id)
        }
        setchecked(all)
    }
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts()
    }, [checked.length, radio.length])

    useEffect(() => {
        if (checked.length || radio.length) filterProduct()
    }, [checked, radio])
    //get filtered prod
    const filterProduct = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio })
            setproducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Layout title={"All Products - Best offers"}>
                <div className="container-fluid row mt-3">
                    <div className="col-md-2">
                        <h4 className="text-center">Filter By Category</h4>
                        <div className="d-flex flex-column">
                            {categories?.map(c => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox>

                            ))}
                        </div>
                        <h4 className="text-center mt-4">Filter By Price</h4>
                        <div className="d-flex flex-column">
                            <Radio.Group onChange={e => setradio(e.target.value)}>
                                {Prices?.map(p => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>

                                ))}
                            </Radio.Group>
                        </div>
                        <div className="d-flex flex-column">
                            <button className="btn btn-danger" onClick={() => window.location.reload()}>Reset Filters</button>
                        </div>

                    </div>
                    <div className="col-md-9">
                        {JSON.stringify(radio, null, 4)}
                        <h1 className="text-center">All Products</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map(p => (
                                // <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className="product-link">
                                <div className="card m-2" style={{ width: '18rem' }}>
                                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}</p>
                                        <p className="card-text">${p.price}</p>
                                        <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <button class="btn btn-secondary ms-1" onClick={() => {
                                            setcart([...cart, p])
                                            localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                            toast.success("Item added to cart")
                                        }}>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                                //  </Link>


                            ))}
                        </div>
                        <div className="m-2 p-3">
                            {products && products.length < total && (
                                <button className="btn btn-warning" onClick={(e) => {
                                    e.preventDefault()
                                    setpage(page + 1)
                                }}>

                                    {loading ? "Loading..." : "Load more"}
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </Layout>

        </>
    );
};
