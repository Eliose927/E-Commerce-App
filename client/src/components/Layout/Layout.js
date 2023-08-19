import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'

//import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children, title, description, author, keywords }) {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '90vh' }}>

                {children}
                <Toaster />

            </main>
            <Footer />
        </>
    );
    /* Layout.defaultProps = {
         title: "Ecommerce app - shop now",
         description: "mern stack project",
         keywords: "mern,react,node,mongodb",
         author: "Techinfoyt",
     };*/

};



