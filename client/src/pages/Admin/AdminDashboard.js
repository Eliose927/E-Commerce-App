import React from 'react'
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
export default function AdminDashboard() {
    const [auth] = useAuth()
    return (
        <div>
            <Layout>
                <div className="container-fliud m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9">
                            <div className="card w-75">
                                <h1>Admin name:{auth?.user?.name}</h1>
                                <h1>Admin Email:{auth?.user?.email}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>

        </div>
    );
};
