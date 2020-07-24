import React from 'react'
import './Subscribe.css'
export default function Subscribe() {
    return (
        <div className='container mt-3'>
        <div className='row mx-5 bg-pink p-3'>
            <div className='col-6'>
                <h5 className='font-weight-bold '>Receive exclusive offers, inspirational stories and travel regulational updates.</h5>
                <p className='text-secondary fontSize-p'>Become a subscriber* and receive great tips on travel planning set to your inbox!</p>
            </div>
            <div className='col-6'>
                <div className='my-2 mt-4'>
                    <input type='email' className='px-4 pr-5 py-2 font-size' placeholder='Enter email address' />
                    <button className='bg-orange btn px-4 text-white font-size py-2 ml-3'>Subscribe</button>
                </div>
                <small className='text-secondary'>By signing up,you agree to our <nbr className='text-orange'>Terms of Service</nbr> and <nbr className='text-orange'>Privacy Policy.</nbr></small>
            </div>
        </div>
        </div>
    )
}