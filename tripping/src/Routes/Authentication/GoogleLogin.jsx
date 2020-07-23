import React from 'react'
import GoogleLogin from 'react-google-login';


export default function GoogleAuthLogin() {

    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <div>
            <GoogleLogin
                clientId="675728086592-3rpv50e7v5nu90chi1kg2k674lo8b3s0.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
