import React, { Component } from 'react'
import { connect } from 'react-redux';
import { emailValidation } from '../../Redux/authentication/Validations/action'
import { signinUserCheck } from '../../Redux/authentication/Signin/action'

import GoogleAuthLogin from './GoogleLogin';
import FacebookAuthLogin from './FacebookLogin';
import { Link, Redirect } from 'react-router-dom';


class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            emailFlag: false,
            password: '',
            // isLogin:'abc'

        }
    }

    handleSignin = () => {
        console.log('enter')
        let { email, password } = this.state

        this.props.signinUserCheck({ email: email, password: password })
       
    }

    render() {
        let { email, emailFlag, password, } = this.state
        let { isLogin, userData} = this.props


        if (!isLogin) {

            <Redirect to={this.props.history.go(-1)} />

        }

        return (
            <div className='container-fluid backgroundColorAuth'>
                <br />
                <div className='container marginTop-Reg '>
                    <div className='row'>
                        <div className='col-4 offset-4 bg-white'>

                            <h4>Sign in</h4>
                            <p>You can sign in using your tripping.com account to access our services</p>
                            <div className='mb-3'>

                                <p className='text-left mt-3'>Email</p>
                                <input type='email' className='form-control ' value={email} onChange={(e) => this.setState({ email: e.target.value })} />
                                {emailFlag && <small className='text-danger warningSize'>Make sure the email address you entered is correct.</small>}

                                <p className='text-left my-2 mt-4'>Password</p>
                                <input type='password' className='form-control ' value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                                {isLogin === 'true' && <small className='text-danger warningSize'>The email and password combination you entered doesn't match.</small>}

                            </div>
                            <button onClick={() => this.handleSignin()} className='btn px-5 bg-orange text-white btnWidth'>Sign in</button>

                            <div className='text-center mt-2'>
                                <small className='text-muted text-center '>or sign in with one click</small>
                            </div>
                            <div className='row my-3'>
                                {/* <div className='col-6'>
                                    <FacebookAuthLogin />
                                </div> */}
                                <div className='col-12'>
                                    <GoogleAuthLogin history={this.props.history} location={this.props.location} />
                                </div>
                            </div>
                            <div className='mt-4'>
                                <p className='text-center'>Don't have an account? <nbr className='text-info'><Link to='/register'>Sign up</Link></nbr></p>
                            </div>
                        </div>
                    </div>

                </div >

            </div>
        )
    }
}


const mapStateToProps = state => ({
    isLogin: state.signin.isLogin,
    checkEmailFlag: state.validation.checkEmailFlag,
    userData:state.signin.user
})
const mapDispatchToProps = dispatch => ({
    emailValidation: (payload) => dispatch(emailValidation(payload)),
    signinUserCheck: (payload) => dispatch(signinUserCheck(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin)