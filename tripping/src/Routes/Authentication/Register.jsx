import React from 'react'
import './Register.css'

import { connect } from 'react-redux';
import { emailValidation, passValidation } from '../../Redux/authentication/Validations/action'
import { signupUserCheck } from '../../Redux/authentication/Register/action'

import GoogleAuthLogin from './GoogleLogin';
import FacebookAuthLogin from './FacebookLogin';
import { Link, Redirect } from 'react-router-dom';


class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailFlag: false,
            email: '',
            newPass: '',
            confirmPass: '',
            passCompareFlag: false,
            passFlag: false,
            firstName:'',
            lastName:''
        }
    }

    handleGetStarted = () => {
        console.log('enter')

        this.props.emailValidation(this.state.email)
        if (!this.props.checkEmailFlag) {
            this.setState({
                emailFlag: true
            })

        } else {
            this.setState({
                emailFlag: false
            })
        }
    }

    handleCreateAccount = () => {
        let { newPass, confirmPass } = this.state

        this.props.passValidation(this.state.newPass)
           
        if (this.props.checkPassFlag) {
            // this.setState({
            //     passFlag: false,

            // })

            if (newPass == confirmPass) {
                let {email, firstName, lastName, confirmPass} = this.state
                 this.props.signupUserCheck({ email: email, password: confirmPass, first_name:firstName, last_name:lastName })
     
             } else {
                 this.setState({ passCompareFlag: true })
             }
        } 
        else {
            this.setState({ passFlag: true })
        }

       
    }
    render() {
        let { emailFlag, email, newPass, confirmPass, passFlag, passCompareFlag, firstName, lastName } = this.state
        // console.log(email)
        let { checkEmailFlag, checkPassFlag, isSignup } = this.props
        console.log(checkEmailFlag, checkPassFlag)
        console.log(isSignup)
        if (!isSignup) {
            return (
                // <div className='container marginTop-Reg'>
                //     <div className='row'>
                //         <div className='col-4 offset-4 text-center'>
                //             <h1>Register Succesfully with the {email}</h1>
                //         </div>
                //     </div>
                // </div>
                 <Redirect to='/' />
            )
        }

        return (
            <div className='container-fluid backgroundColorAuth'>
                <br />
            <div className='container marginTop-Reg '>
                
                <div className='row '>
                    <div className='col-4 offset-4 text-center bg-white'>

                        <h4 className='text-left'>Create your account</h4>
                        <p className='text-left'>Create an account to use Tripping.com services easily.</p>
                        <div className='mb-3'>

                            {!checkEmailFlag && <>
                                <p className='text-left'>Email</p>
                                <input type='email' className='form-control ' value={email} onChange={(e) => this.setState({ email: e.target.value })} />
                                {emailFlag && <small className='text-danger warningSize'>Make sure the email address you entered is correct.</small>}
                            </>}

                            {checkEmailFlag && <>
                                <p className='text-left'>First Name</p>
                                <input type='text' className='form-control my-2' value={firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                                <p className='text-left'>First Name</p>
                                <input type='text' className='form-control my-2' value={lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
                                <p className='text-left'>Create password</p>
                                <input type='password' className='form-control my-2' value={newPass} onChange={(e) => this.setState({ newPass: e.target.value })} />
                                {passFlag && <p className='text-danger warningSize text-left'>Your new password has to be at least 8 characters,one uppercase, lowercase, digit and character</p>}
                                <p className='text-left'>Confirm password</p>
                                <input type='password' className='form-control my-2' value={confirmPass} onChange={(e) => this.setState({ confirmPass: e.target.value })} />
                                {passCompareFlag && <p className='text-danger warningSize text-left'>The passwords you entered didn't match -try again</p>}
                            </>
                            }
                        </div>
                        {!checkEmailFlag && <button onClick={() => this.handleGetStarted()} className='btn px-5 bg-orange  text-white btnWidth' >Get started</button>}

                        {checkEmailFlag && <button onClick={() => this.handleCreateAccount()} className='btn btnWidth bg-orange text-white'>Create Account</button>}

                        <small className='text-muted text-center '>or sign in with one click</small>
                        <div className='row my-3'>
                            <div className='col-6'>
                                <FacebookAuthLogin />
                            </div>
                            <div className='col-6'>
                                <GoogleAuthLogin />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <p>Already have an account? <nbr className='text-info'><Link to='/signin'>Sign in</Link></nbr></p>
                        </div>
                    </div>
                </div>

            </div>
            
            </div>
        )
    }
}

const mapStateToProps = state => ({
    checkEmailFlag: state.validation.checkEmailFlag,
    checkPassFlag: state.validation.checkPassFlag,
    isSignup: state.signup.isSignup,
})
const mapDispatchToProps = dispatch => ({
    emailValidation: (payload) => dispatch(emailValidation(payload)),
    passValidation: (payload) => dispatch(passValidation(payload)),
    signupUserCheck: (payload) => dispatch(signupUserCheck(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(Register)