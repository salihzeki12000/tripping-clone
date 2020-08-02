import React from 'react'

import FacebookLogin from 'react-facebook-login';

export default function FacebookAuthLogin() {
  

    const responseFacebook = (response) => {
        console.log(response);
        console.log(response.accessToken)

    }

    const componetClicked = data => {
        console.log("data", data)
    }

    return (
        <div>
            <FacebookLogin
                appId="594560051430242"
                autoLoad={false}
                fields="name,email,picture"
                onClick={componetClicked}
                callback={responseFacebook}
                textButton={"Facebook"}
                size={"small"}
            />
        </div>
    )
}
