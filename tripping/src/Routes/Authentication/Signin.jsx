import React, { Component } from 'react'
import { connect } from 'react-redux';
import { emailValidation } from '../../Redux/authentication/Validations/action'
import {signinUserCheck} from '../../Redux/authentication/Signin/action'


class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            emailFlag: false,
            password:'',
            // isLogin:'abc'

        }
    }

    handleSignin = () => {
        console.log('enter')
        let {email, password} = this.state

        this.props.emailValidation(this.state.email)

        if (!this.props.checkEmailFlag) {
            // this.setState({
            //     emailFlag: true
            // })

        } else {
            // this.setState({
            //     emailFlag: false
            // })

             this.props.signinUserCheck({email:email, password:password})
            // this.setState({
            //     islogin: x
            // })
        }
    }

    render() {
        let { email, emailFlag, password} = this.state
        let { isLogin} = this.props
        console.log(isLogin)
        
        if(isLogin ==='false') {
            return(
                <div className='container marginTop-Reg'>
                <div className='row'>
                    <div className='col-4 offset-4 text-center'>
                        <h1></h1>
                    </div>
                </div>
            </div>
            )
        }

        return (
            <div className='container marginTop-Reg'>
                <div className='row'>
                    <div className='col-4 offset-4'>

                        <h4>Sign in</h4>
                        <p>You can sign in using your tripping.com account to access our services</p>
                        <div className='mb-3'>

                            <p className='text-left mt-3'>Email</p>
                            <input type='email' className='form-control ' value={email} onChange={(e) => this.setState({ email: e.target.value })} />
                            {emailFlag && <small className='text-danger warningSize'>Make sure the email address you entered is correct.</small>}

                            <p className='text-left my-2 mt-4'>Password</p>
                            <input type='email' className='form-control ' value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                            {isLogin ==='true' && <small className='text-danger warningSize'>The email and password combination you entered doesn't match.</small>}

                        </div>
                        <button onClick={() => this.handleSignin()} className='btn px-5 bg-orange text-white btnWidth'>Next</button>

                    </div>
                </div>

            </div >
        )
    }
}


const mapStateToProps = state => ({
    isLogin: state.signin.isLogin,
    checkEmailFlag: state.validation.checkEmailFlag,
})
const mapDispatchToProps = dispatch => ({
    emailValidation: (payload) => dispatch(emailValidation(payload)),
    signinUserCheck: (payload) => dispatch(signinUserCheck(payload))
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin)