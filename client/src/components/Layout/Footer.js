import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className='footer'>
            <h4 className='text-center'>Developed by Tanisha Dey</h4>
            <p className='text-center mt-1 mb-1'>
                <Link to='/about'>
                    About
                </Link>
                <Link to='/contact'>
                    Contact
                </Link>
                <Link to='/policy'>
                    Policy
                </Link>
            </p>
        </div>
    )
};
