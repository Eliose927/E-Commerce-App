import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function CategoryProduct() {
    const navigate = useNavigate()
    const [products, setproducts] = useState([])
    const [category, setcategory] = useState([])
    const params = useParams()
    const getProductsByCat = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setproducts(data?.products)
            setcategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (params?.slug) getProductsByCat()
    }, [params?.slug])
    return (
        <Layout>
            <div className="container mt-3">
                <h1 className="text-center">Category - {category?.name}</h1>
                <h6 className="text-center">{products.length} results found</h6>
                <div className="row">

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
                                    <button class="btn btn-secondary ms-1">Add to cart</button>
                                </div>
                            </div>
                            //  </Link>


                        ))}
                    </div>

                </div>
            </div>
        </Layout>
    );
};
