import React from 'react'
import './Register.css'

import { connect } from 'react-redux';
import { emailValidation, passValidation } from '../../Redux/authentication/Validations/action'


import GoogleAuthLogin from './GoogleLogin';
import FacebookAuthLogin from './FacebookLogin';
import { Link } from 'react-router-dom';


class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailFlag: false,
            email: '',
            newPass: '',
            confirmPass: '',
            passCompareFlag: false,
            passFlag: false
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

        if (this.setState.checkPassFlag) {
            this.setState({
                passFlag: false,

            })
        } else {
            this.setState({ passFlag: true })
        }

        if (newPass === confirmPass) {


        } else {
            this.setState({ passCompareFlag: true })
        }
    }
    render() {
        let { emailFlag, email, newPass, confirmPass, passFlag, passCompareFlag } = this.state
        // console.log(email)
        let { checkEmailFlag, checkPassFlag } = this.props
        console.log(checkEmailFlag, checkPassFlag)

        if (checkPassFlag && checkEmailFlag) {
            return (
                <div className='container marginTop-Reg'>
                    <div className='row'>
                        <div className='col-4 offset-4 text-center'>
                            <h1>Register Succesfully with the {email}</h1>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className='container marginTop-Reg'>
                <div className='row '>
                    <div className='col-4 offset-4 text-center'>

                        <h4 className='text-left'>Create your account</h4>
                        <p className='text-left'>Create an account to use Tripping.com services easily.</p>
                        <div className='mb-3'>

                            {!checkEmailFlag && <>
                                <p className='text-left'>Email</p>
                                <input type='email' className='form-control ' value={email} onChange={(e) => this.setState({ email: e.target.value })} />
                                {emailFlag && <small className='text-danger warningSize'>Make sure the email address you entered is correct.</small>}
                            </>}

                            {checkEmailFlag && <>
                                <p className='text-left'>Create password</p>
                                <input type='password' className='form-control my-2' value={newPass} onChange={(e) => this.setState({ newPass: e.target.value })} />
                                {passFlag && <p className='text-danger warningSize text-left'>Your new password has to be at least 8 characters,one uppercase, lowercase, digit and character</p>}
                                <p className='text-left'>Confirm password</p>
                                <input type='password' className='form-control my-2' value={confirmPass} onChange={(e) => this.setState({ confirmPass: e.target.value })} />
                                {passCompareFlag && <p className='text-danger warningSize text-left'>The passwords you entered didn't match -try again</p>}
                            </>
                            }
                        </div>
                        {!checkEmailFlag && <button onClick={() => this.handleGetStarted()} className='btn px-5 bg-orange text-white btnWidth'>Get started</button>}

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
        )
    }
}

const mapStateToProps = state => ({
    checkEmailFlag: state.validation.checkEmailFlag,
    checkPassFlag: state.validation.checkPassFlag
})
const mapDispatchToProps = dispatch => ({
    emailValidation: (payload) => dispatch(emailValidation(payload)),
    passValidation: (payload) => dispatch(passValidation(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(Register)