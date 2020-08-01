import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { getUser } from '../../Redux/authentication/Register/action';
import { connect } from 'react-redux';

// const responseGoogle = (response) => {
//     console.log(response.wc);


// let {email, givenName, familyName, googleId, imageUrl} = response.profileObj
// let {access_token, expires_in} = response.wc
//     let obj = {
//         "first_name": givenName,
//         "last_name": familyName,
//         "email": email,
//         "provider": "google",
//         "provider_id": googleId,
//         "access_token": access_token,
//         "image_url": imageUrl,
//         "expired_in": expires_in
//     }

//     getUser({firstName:givenName, lastName:familyName})

//     axios.post("http://eba6e9ff2887.ngrok.io/auth/login", obj)
//     .then(res => res.data)
//     .then(res => {
//         axios.get("http://159c2e4f2101.ngrok.io/auth/get_user_info?auth_token=",+ res.token)
//         .then(res => res.data)
//         .then(res => console.log(res))
//     })
//     // .then(res=> console.log(res))
//     //.then(res => {
//     //     // console.log(res.error)
//     //     //  if(res.error == false) {
//     //     //      console.log('check')
//     //     // return(
//     //     //     <Redirect to='/' />
//     //     // )
//     // }

//    //  })


 

// }


class GoogleAuthLogin extends React.Component {

    constructor(props) {
        super(props) 
        this.state={
            success:false
        }
    }


    responseGoogle = (response) => {

let {email, givenName, familyName, googleId, imageUrl} = response.profileObj
let {access_token, expires_in} = response.wc
    let obj = {
        "first_name": givenName,
        "last_name": familyName,
        "email": email,
        "provider": "google",
        "provider_id": googleId,
        "access_token": access_token,
        "image_url": imageUrl,
        "expired_in": expires_in
    }

    this.props.getUser({firstName:givenName, lastName:familyName, success:true, image:imageUrl})

    

    axios.post("https://0bec60d8d8c8.ngrok.io/auth/login", obj)
    .then(res => res.data)
    .then(res => this.setState({
        success:true
    }))
    
    // .then(res => {
    //     axios.get("http://159c2e4f2101.ngrok.io/auth/get_user_info?auth_token=",+ res.token)
    //     .then(res => res.data)
    //     .then(res => this.setState({
    //         success:true
    //     }))
    // })
    }

render() {
   console.log(this.state.success)
    if(this.state.success) {
        console.log(this.state.success)
        return (
            
            <Redirect to='/' />
        )
    }

    return (
        <div>
            <GoogleLogin
                clientId="675728086592-3rpv50e7v5nu90chi1kg2k674lo8b3s0.apps.googleusercontent.com"
                buttonText="Login"
                render={''}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={''}
            />
        </div>
    )
}
}

// const mapStateTOProps = store => ({

// })

const mapDispatchToProps = dispatch => ({
    getUser: (payload) => dispatch(getUser(payload))
})

export default connect(null, mapDispatchToProps)(GoogleAuthLogin)


