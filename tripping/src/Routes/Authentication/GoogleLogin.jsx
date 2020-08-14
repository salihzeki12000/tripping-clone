import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { getUser } from '../../Redux/authentication/Register/action';
import { connect } from 'react-redux';


function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}



class GoogleAuthLogin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            success: false
        }
    }

    responseGoogle = (response) => {

        let { email, givenName, familyName, googleId, imageUrl } = response.profileObj
        let { access_token, expires_in } = response.wc
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

        this.props.getUser({ firstName: givenName, lastName: familyName, success: true, image: imageUrl })


    axios.post("http://trippingbackend.gunjan.tech/auth/login", obj)
    .then(res => res.data)
    .then(res => saveData('token',res.token))

        // axios.post("http://tripping.gunjan.tech/auth/login", obj)
        //     .then(res => res.data)
        //     .then(res => saveData('token', res.token))
    }



    render() {

        //console.log(localStorage.getItem('token'))
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


const mapDispatchToProps = dispatch => ({
    getUser: (payload) => dispatch(getUser(payload))
})

export default connect(null, mapDispatchToProps)(GoogleAuthLogin)


