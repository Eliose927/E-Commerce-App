import React from 'react'
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';
export default function Search() {
    const [values, setvalues] = useSearch()
    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search results</h1>
                    <h6>{values?.results.length < 1 ? "No products found" : `Found ${values?.results.length}`}</h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map(p => (
                            // <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className="product-link">
                            <div className="card m-2" style={{ width: '18rem' }}>
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}</p>
                                    <p className="card-text">${p.price}</p>
                                    <button class="btn btn-primary ms-1">Go somewhere</button>
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
