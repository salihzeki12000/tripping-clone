import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactGa from 'react-ga';
import axios from 'axios'


function getData(key) {
    try {
        let data = localStorage.getItem(key)
        data = JSON.parse(data)
        return data
    }
    catch{
        return undefined
    }
}


class HomeNavbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.userData,
            flag:false
        }
    }

    componentDidMount() {
       // if(getData('token')){
            // axios.get("http://trippingbackend.gunjan.tech/auth/get_user_info", {
            //     params: {
            //         token: getData('token')
            //     }
            // })
                // .then(res => res.data)
                // .then(res => this.setState({
                //     user: res.data
                // }))
       // }

       this.setState({
           user: getData('user')
       })

    }

        
    render() {
        let { user } = this.state
        console.log(user)
        return (
            <div className='container-fluid'>

                <nav class="navbar bg-light">
                    <div>
                        <Link to='/'>
                            <p onClick={() => ReactGa.event({ category: 'Logo', action: 'user clicked Logo' })} className="logo">
                                <img src='/logo1.png' alt='/' width='80px' height='30px' />
                            </p>
                        </Link>
                    </div>
                    <form class="form-inline">
                        {user && <>  <p style={{ fontSize: '20px', color: '#FB8C00' }}>{user.first_name + " " + user.last_name}</p></>}

                        {!user && <>

                            <Link to='/register'><button className='btn text-white mx-1 font-weight-bold' style={{ backgroundColor: "#FB8C00" }} onClick={() => ReactGa.event({ category: 'register button', action: 'user clicked register button' })}>Register</button></Link>
                            <Link to='/signin'><button className='btn text-white mx-1 font-weight-bold' style={{ backgroundColor: "#FB8C00" }} onClick={() => ReactGa.event({ category: 'signin button', action: 'user clicked signin button' })}>Sign in</button></Link>
                        </>}

                    </form>
                </nav>


            </div>
        )
    }
}


const mapStateToProps = state => ({
    // user: state.signup.user,
    userData: state.signin.userData
})

export default connect(mapStateToProps)(HomeNavbar)
