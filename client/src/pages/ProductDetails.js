import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
export default function ProductDetails() {
    const params = useParams()
    const [product, setproduct] = useState({})
    const [relatedProducts, setrelatedProducts] = useState([])
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setproduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])

    //get similar prod
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setrelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6 text-center">
                    <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top"
                        alt={product.name} height={"400px"} width={"350px"} />
                </div>
                <div className="col-md-6">
                    <h1 className="text-center">Product details</h1>
                    <h6>Name: {product.name}</h6>
                    <h6>Description: {product.description}</h6>
                    <h6>Price: {product.price}</h6>
                    <h6>Category: {product?.category?.name}</h6>
                    <button class="btn btn-secondary ms-1">Add to cart</button>
                </div>
            </div>
            <div className="row container">
                <h1>Similar products</h1>
                {relatedProducts.length < 1 && <p className="text-center">No similar items found</p>}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map(p => (
                        // <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className="product-link">
                        <div className="card m-2" style={{ width: '18rem' }}>
                            <img src={`/api/v1/product/product-photo/${p?._id}`} className="card-img-top" alt={p.name} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0, 30)}</p>
                                <p className="card-text">${p.price}</p>

                                <button class="btn btn-secondary ms-1">Add to cart</button>
                            </div>
                        </div>
                        //  </Link>


                    ))}
                </div>
            </div>
        </Layout>
    );
};
