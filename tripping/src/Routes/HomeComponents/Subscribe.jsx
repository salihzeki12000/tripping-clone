import React from 'react'
import './Subscribe.css'
export default function Subscribe() {
    return (
        <div className='container-fluid-sm container-md  mt-3'>
            <div className="offset-md-1 col-md-10 col-12">
                <div className='row bg-pink p-3 border rounded'>
                    <div className=' col-6'>
                        <h5 className='font-weight-bold '
                            style={{ color: "#263238" }}>Receive exclusive offers, inspirational stories and travel regulational updates.</h5>
                        <p className='text-secondary'>Become a subscriber* and receive great tips on travel planning set to your inbox!</p>
                    </div>
                    <div className='col-6'>
                        <div className='my-2 mt-4'>
                            <input type='email' className='p-2 font-size' placeholder='Enter email address' />
                            <button className='bg-orange btn px-4 text-white font-size py-md-2 ml-md-3 mt-sm-2 mt-md-0'>Subscribe</button>
                        </div>
                        <small className='text-secondary'>By signing up,you agree to our <nbr className='text-orange'>Terms of Service</nbr> and <nbr className='text-orange'>Privacy Policy.</nbr></small>
                    </div>
                </div>
            </div>
        </div>
    )
}
