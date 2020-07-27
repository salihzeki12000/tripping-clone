import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function DetailsCard(props) {
    let { user } = props
    return (
        <div className="container-fluid">
            <br />
            <div className='container'>
                <div className='row my-3'>
                    <div className='col-2'>
                        <div>
                            <Link to='/'><img src='/logo1.png' alt='/' width='80px' height='30px' /></Link>
                        </div>
                    </div>
                    <div className='col-3 offset-2  border rounded-pill shadow-sm'>
                        <button className='btn btn-white text-center ml-5 px-2 py-2'><i class="fa fa-search text-warning px-2"></i> Add a location</button>
                    </div>
                    <div className='col-3 offset-2 ml-5'>

                        {user.success && <>  <img src={user.image} width='50px' height='50px' style={{ borderRadius: '50%' }} /><p style={{ fontSize: '25px', color: 'orange' }}>{user.firstName + " " + user.lastName}</p></>}

                        {!user.success && <div className='d-flex flex-row'>

                            <Link to='/register'><button className='btn text-white ml-5 px-3 mx-3  font-weight-bold' style={{ backgroundColor: "#FB8C00" }}>Register</button></Link>
                            <Link to='/signin'><button className='btn text-white px-3 font-weight-bold' style={{ backgroundColor: "#FB8C00" }}>Sign in</button></Link>
                        </div>}
                    </div>
                </div>
            </div>
            <hr className='hrFull' />
            <br />
            <div className='container'>

                <h1 className='text-dark'>Apartment in Bengaluru</h1>
                <div className='d-flex flex-row'>
                    <p><i class="fa fa-star text-warning" aria-hidden="true"></i></p>
                    <p className='mx-3 text-secondary'>4.77(52)</p>
                    <p className="mx-1">.</p>
                </div>

                <div className="row my-3">
                    <div className="col-6 p-2">
                        <img className="img-fluid detCard" src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6 pt-2"> <img className="img-fluid childCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSXA7cZfSiDCpTVCQOniurqXnoMW5WY44RBmQ&usqp=CAU" /></div>
                            <div className="col-6 pt-2"> <img className="img-fluid childCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhFXUSMNjdiI_PESAiX1ou5IhOw0DwGufm6g&usqp=CAU" /></div>
                            <div className="col-6 pt-2 mt-3"> <img className="img-fluid childCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQN26rpwgMGFDRR8pa5VnxwYmsp4zxOzOmUOQ&usqp=CAU" /></div>
                            <div className="col-6 pt-2 mt-3"> <img className="img-fluid childCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSv35EAXq1avsPX49Q75KW2kLlOrVvAwb3mmQ&usqp=CAU" /></div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-9'>
                        <div className='row'>
                            <div className='col-9'>
                                <h2>Entire Apartment hosted by Masai</h2>
                                <p>16+ guests . 2 bedroom . 2  bed . 4 bathrooms</p>
                            </div>
                            <div>
                                image of owner
                             </div>
                        </div>
                        <hr className='hrFull' />

                    </div>
                    <div className='col-3'>
                        Fixed card
                    </div>
                </div>

            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    user: state.signup.user
})

export default connect(mapStateToProps)(DetailsCard)
