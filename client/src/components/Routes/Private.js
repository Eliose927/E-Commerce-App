import { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import axios from "axios"
import React from 'react'
import { Outlet } from "react-router-dom"
import Spinner from "../Spinner"

export default function PrivateRoute() {
    const [ok, setok] = useState(false);
    const [auth, setauth] = useAuth();
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("/api/v1/auth/user-auth")


            if (res.data.ok) {
                setok(true);

            } else {
                setok(false);
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token]);
    return ok ? <Outlet /> : <Spinner />;




};
