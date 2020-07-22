import React from 'react'
import './PopularDestinations.css'

export default function PopularDestinations() {
    return (
        <div className='container mt-5 p-4'>
            <h2 className='font-weight-bold margin-left'>Popular Destinations</h2>
            <div className='row mx-5 mt-3'>
                <div className='col-6 bgImage-Berlin  px-5'>
                    <h4 className='margin-top font-weight-bold text-white'>Berlin</h4>
                </div>
                <div className='col-6 bgImage-Miami  px-5'>
                    <h4 className='margin-top font-weight-bold text-white'>Miami</h4>
                </div>
                <div className='col-6 bgImage-Newyork  px-5 mt-3'>
                    <h4 className='margin-top font-weight-bold text-white'>New York</h4>
                </div>
                <div className='col-6 bgImage-Phuket  px-5 mt-3'>
                    <h4 className='margin-top font-weight-bold text-white'>Phuket</h4>
                </div>
                <div className='col-6 bgImage-Janeiro  px-5 mt-3'>
                    <h4 className='margin-top font-weight-bold text-white'>Rio de Janerio</h4>
                </div>
                <div className='col-6 bgImage-Francisco  px-5 mt-3'>
                    <h4 className='margin-top font-weight-bold text-white'>San Francisco</h4>
                </div>
            </div>
        </div>
    )
}
