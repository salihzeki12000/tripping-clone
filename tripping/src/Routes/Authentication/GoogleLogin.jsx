import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import {Redirect} from 'react-router-dom'


export default function GoogleAuthLogin() {

    const responseGoogle = (response) => {
        console.log(response.wc);
    

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

        axios.post("http://a52b28395722.ngrok.io/auth/login", obj)
        .then(res => res.data)
        // .then(res=> console.log(res))
        .then(res => {
            console.log(res.error)
             if(res.error == false) {
                 console.log('check')
            return(
                <Redirect to='/' />
            )
        }
        })

    }

    return (
        <div>
            <GoogleLogin
                clientId="675728086592-3rpv50e7v5nu90chi1kg2k674lo8b3s0.apps.googleusercontent.com"
                buttonText="Login"
                render={''}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={''}
            />
        </div>
    )
}
