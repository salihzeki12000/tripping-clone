import React from 'react'
import './Register.css'

import { connect } from 'react-redux';
import {emailValidation} from '../Redux/authentication/action'

import GoogleLogin from 'react-google-login';

import FacebookLogin from 'react-facebook-login';


const responseGoogle = (response) => {
    console.log(response);
}


//const FacebookLogin = () => {
    const componetClicked = data => {
        console.log("data", data)
    }
//}


const responseFacebook = (response) => {
    console.log(response);
}


class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailFlag:false,
            email:''
        }
    }

    handleGetStarted = () => {
        // let {emailValidation}
        console.log('enter')

        this.props.emailValidation(this.state.email)
        if(!this.props.checkEmailFlag) {
            this.setState({
                emailFlag: true
            })
        }else {
            this.setState({
                emailFlag: false
            })
        }
    }
    render() {
        let {emailFlag, email} = this.state
        // console.log(email)
        let {checkEmailFlag} = this.props
        console.log(emailFlag)
        return (
            <div className='container marginTop-Reg'>
                <div className='row '>
                    <div className='col-4 offset-4 text-center'>
                        <h4 className='text-left'>Create your account</h4>
                        <p className='text-left'>Create an account to use Tripping.com services easily.</p>
                        <div className='mb-3'>
                           
                           
                            {!checkEmailFlag && <> 
                             <p className='text-left'>Email</p>
                              <input type='email' className='form-control ' value={email} onChange={(e)=>this.setState({email:e.target.value})} />
                              {emailFlag && <small className='text-danger warningSize'>Make sure the email address you entered is correct.</small>}
                              </>}
                           
                         {checkEmailFlag && <>
                            <p className='text-left'>Create password</p>
                            <input type='password' className='form-control' />
                            <p className='text-left'>Confirm password</p>
                            <input type='password' className='form-control' /> 
                            </>
                            }
                        </div>
                        {!checkEmailFlag && <button onClick={()=>this.handleGetStarted()} className='btn px-5 bg-orange text-white btnWidth'>Get started</button> }
                       
                        {checkEmailFlag && <button onClick={()=>this.handleGetStarted()} className='btn form-control bg-orange text-white'>Create Account</button> }

                        <small className='text-muted text-center '>or sign in with one click</small>
                        <div className='row my-3'>
                            <div className='col-6'>
                                {/* <i clas￼sName="fa fa-facebook-official text-primary" aria-hidden="true"></i><br />
                                <small>Facebook</small> */}
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
                            <div className='col-6'>

                                {/* <i class="fa fa-google" aria-hidden="true"></i><br />
                                <small >Google</small> */}
                                <GoogleLogin
                                    clientId="675728086592-3rpv50e7v5nu90chi1kg2k674lo8b3s0.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <p>Already have an account? <nbr className='text-info'>Sign in</nbr></p>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    checkEmailFlag: state.checkEmailFlag
})
const mapDispatchToProps = dispatch => ({
    emailValidation : (payload) => dispatch(emailValidation(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(Register)