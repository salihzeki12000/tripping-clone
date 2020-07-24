import React from 'react'
import './PopularDestinations.css'
import { Link } from 'react-router-dom'

export default function PopularDestinations() {
    return (
        <div className='container mt-5 p-4'>
            <h2 className='font-weight-bold margin-left'>Popular Destinations</h2>
            <div className='row mx-5 mt-3'>

                <div className='col-6 mt-3 '>
                    <Link to={`/vacation-rentals/s/search/${'Berlin'}`}>
                        <div className='containerImg'>
                            <img src="https://cdn.hometogo.net/assets/media/jpg/51e60c2f3a26a13eb79d0d3edb8671ee.jpg" className='popImg' />
                            <div className='bottom-leftText'>
                                <h4 className='font-weight-bold '>Berlin</h4>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='col-6 mt-3 '>
                    <Link to={`/vacation-rentals/s/search/${'Miami'}`}>
                        <div className='containerImg'>
                            <img src='https://cdn.hometogo.net/assets/media/jpg/53c53e48af005957c8cac94d0292f71e.jpg' className='popImg' />
                            <div className='bottom-leftText'>
                                <h4 className='font-weight-bold '>Miami</h4>
                            </div>
                        </div>

                    </Link>
                </div>
                <div className='col-6 mt-3 '>
                    <Link to={`/vacation-rentals/s/search/${'New York'}`}>
                        <div className='containerImg'>
                            <img src='https://cdn.hometogo.net/assets/media/jpg/801e1d4499f98aa2b92c81e7d96f28f4.jpg' className='popImg' />
                            <div className='bottom-leftText'>
                                <h4 className='font-weight-bold '>New York</h4>
                            </div>
                        </div>

                    </Link>
                </div>
                <div className='col-6 mt-3 '>
                    <Link to={`/vacation-rentals/s/search/${'Phuket'}`}>
                        <div className='containerImg'>
                            <img src='https://cdn.hometogo.net/assets/media/jpg/407d32931b83e88d528714c4d1abb0f5.jpg' className='popImg' />
                            <div className='bottom-leftText'>
                                <h4 className='font-weight-bold '>Phuket</h4>
                            </div>
                        </div>

                    </Link>
                </div>
                <div className='col-6 mt-3 '>
                    <Link to={`/vacation-rentals/s/search/${'Rio de Janerio'}`}>
                        <div className='containerImg'>
                            <img src="https://cdn.hometogo.net/assets/media/jpg/5e4093de0b399962a847978146ce4e42.jpg" className='popImg' />
                            <div className='bottom-leftText'>
                                <h4 className='font-weight-bold '>Rio de Janerio</h4>
                            </div>
                        </div>

                    </Link>
                </div>

                <div className='col-6 mt-3'>
                    <Link to={`/vacation-rentals/s/search/${'San Francisco'}`}>
                        <div className='containerImg'>
                            <img src='https://cdn.hometogo.net/assets/media/jpg/6f6876a7477cc9926cfba2160e4d1710.jpg' className='popImg' />
                            <div className='bottom-leftText'>
                                <h4 className='font-weight-bold '>San Francisco</h4>
                            </div>
                        </div>

                    </Link>
                </div>

            </div>
        </div>
    )
}
