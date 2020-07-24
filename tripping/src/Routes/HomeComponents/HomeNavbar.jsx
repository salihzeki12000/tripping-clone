import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { userData } from '../../Redux/authentication/Signin/action'

 function HomeNavbar(props) {
let {user} = props
console.log(user.success)
    return (
        <div className='container-fluid'>


            <nav class="navbar navbar-light bg-light">
                <div class="navbar-brand">
                    <Link to='/'><img src='/logo.svg' alt='/' width='100px' height='100px' /></Link>
                </div>
                <form class="form-inline">
                    {user.success &&<>  <img src={user.image} width='100px' height='100px' style={{borderRadius:'50%'}} /><p style={{fontSize:'25px', color:'orange'}}>{user.firstName + " " + user.lastName}</p></>}

                    {!user.success && <>
                    
                    <Link to='/register'><button className='btn bg-orange text-white mx-3 py-2'>Register</button></Link>
                    <Link to='/signin'><button className='btn bg-orange text-white mx-3 py-2'>Sign in</button></Link>
                    </> } 

                </form>
            </nav>


        </div>
    )
}


const mapStateToProps = state => ({
    user:state.signup.user
})

export default connect(mapStateToProps)(HomeNavbar)
