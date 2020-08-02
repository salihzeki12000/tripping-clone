import React, { Component } from 'react'
import { connect } from 'react-redux';
import { emailValidation } from '../../Redux/authentication/Validations/action'
import { signinUserCheck, userDataRequest } from '../../Redux/authentication/Signin/action'

import GoogleAuthLogin from './GoogleLogin';
import FacebookAuthLogin from './FacebookLogin';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'



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

        // this.props.emailValidation(this.state.email)

        // if (!this.props.checkEmailFlag) {
        //     // this.setState({
        //     //     emailFlag: true
        //     // })

        // } else {
        //     // this.setState({
        //     //     emailFlag: false
        //     // })

        //     this.props.signinUserCheck({ email: email, password: password })
        //     // this.setState({
        //     //     islogin: x
        //     // })
        // }

        this.props.signinUserCheck({ email: email, password: password })
        // this.props.getToken(this.props.token)
        // this.props.userDataRequest(this.props.token)
    }

    

       

    render() {
        let { email, emailFlag, password } = this.state
        let { isLogin, token, userDataRequest, getToken, user} = this.props
        // console.log(isLogin, token)
    // console.log(token)

            console.log(user)
        
        if (isLogin == false || user.success) {
        //    userDataRequest(token)
        // getToken(token)
            return (
               
                // <div className='container marginTop-Reg'>
                //     <div className='row'>
                //         <div className='col-4 offset-4 text-center'>
                //             <h1>dsfdsfdsafdsaf</h1>
                //         </div>
                //     </div>
                // </div>
                <Redirect to='/' />
            )
        }

        return (
            <div className='container-fluid backgroundColorAuth'>
                <br/>
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
                            <div className='col-6'>
                                <FacebookAuthLogin />
                            </div>
                            <div className='col-6'>
                                <GoogleAuthLogin history={this.props.history}/>
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
    token: state.signin.token,
    checkEmailFlag: state.validation.checkEmailFlag,
    user:state.signup.user
})
const mapDispatchToProps = dispatch => ({
    emailValidation: (payload) => dispatch(emailValidation(payload)),
    signinUserCheck: (payload) => dispatch(signinUserCheck(payload)),
    userData: (payload) => dispatch(userDataRequest(payload)),
    getToken: (payload) => dispatch(getToken(payload))
   

})

export default connect(mapStateToProps, mapDispatchToProps)(Signin)