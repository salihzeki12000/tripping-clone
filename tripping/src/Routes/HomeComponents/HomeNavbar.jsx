import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userData } from '../../Redux/authentication/Signin/action'

 function HomeNavbar(props) {
let {userData} = props
console.log(userData)
    return (
        <div className='container-fluid'>


            <nav class="navbar navbar-light bg-light">
                <div class="navbar-brand">
                    <Link to='/'><img src='/logo.svg' alt='/' width='100px' height='100px' /></Link>
                </div>
                <form class="form-inline">
                    <Link to='/register'><button className='btn bg-orange text-white mx-3 py-2'>Register</button></Link>
                    <Link to='/signin'><button className='btn bg-orange text-white mx-3 py-2'>Sign in</button></Link>
                </form>
            </nav>


        </div>
    )
}


const mapStateToProps = state => ({
    userData:state.signin.userData
})

export default connect(mapStateToProps)(HomeNavbar)
