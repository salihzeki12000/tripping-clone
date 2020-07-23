import React from 'react'

import FacebookLogin from 'react-facebook-login';

export default function FacebookAuthLogin() {
  
    //get long live access token here exchange_token is comes from when we click on the facebook login
    // https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=594560051430242&client_secret=6a4b79cd7a79254b2224190cacc28c62&fb_exchange_token=EAAIcv8ypw2IBANuXL2ZA0C6DLiE3CZCGGkx5DDogJpByLhlcLahy7TjwRtCgTC2dq9a8R23MPjamxcKTTCMSKwd79ZCLPSKMG18jqRtqZCTxYxNZAheOmNwGk1X14yKUEgRZCbZBBjOlsr0ECfRl9AghMeZBX21998ctYBqeZCXjghidavyeCM9KOujF6rCTjHfVhkYSm5ZAkT0wZDZD
    //response : {
//     "access_token": "EAAIcv8ypw2IBANljZCZCtEKUPd10ZC3zIgNG2heyJSNd9TdZCyhZBYciMlsJRXk93h8Oh02qGkqZCcaKyTYORadvcJqOmSxV9UIKgAUlr3A8EsCvHPXG259asxei9obZChrxDtSSLr9r87Rpkk882nyZCMDMV0h4fq6iKZA5412RpFQZDZD",  ---> long-lived-access token
//     "token_type": "bearer",
//     "expires_in": 5184000
// }

//get userid and name this access_token we get from the above long lived token
//https://graph.facebook.com/v6.0/me?access_token=EAAIcv8ypw2IBANljZCZCtEKUPd10ZC3zIgNG2heyJSNd9TdZCyhZBYciMlsJRXk93h8Oh02qGkqZCcaKyTYORadvcJqOmSxV9UIKgAUlr3A8EsCvHPXG259asxei9obZChrxDtSSLr9r87Rpkk882nyZCMDMV0h4fq6iKZA5412RpFQZDZD
//response : {
//     "name": "Uday Akula",
//     "id": "2813059555647142"
// }




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
