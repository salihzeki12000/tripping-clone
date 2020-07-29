import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { userData } from '../../Redux/authentication/Signin/action'

function HomeNavbar(props) {
    let { user } = props
    console.log(user.success)
    return (
        <div className='container-fluid'>

            <nav class="navbar bg-light">
                <div>
                    <Link to='/'><img src='/logo1.png' alt='/' width='80px' height='30px' /></Link>
                </div>
                <form class="form-inline">
                    {user.success && <>  <img src={user.image} width='80px' height='80px' style={{ borderRadius: '50%' }} /><p style={{ fontSize: '25px', color: '#FB8C00' }}>{user.firstName + " " + user.lastName}</p></>}

                    {!user.success && <>

                        <Link to='/register'><button className='btn text-white mx-1 font-weight-bold' style={{backgroundColor:"#FB8C00"}}>Register</button></Link>
                        <Link to='/signin'><button className='btn text-white mx-1 font-weight-bold'  style={{backgroundColor:"#FB8C00"}}>Sign in</button></Link>
                    </>}

                </form>
            </nav>


        </div>
    )
}


const mapStateToProps = state => ({
    user: state.signup.user
})

export default connect(mapStateToProps)(HomeNavbar)
