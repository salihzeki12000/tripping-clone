import React, { Component } from 'react'
import BillingCard from './BillingCard'
import { connect } from 'react-redux'
import axios from 'axios'
import querystring from 'query-string';
import { noOfDays } from '../../Redux/SearchBar/action'
import { emailValidation } from '../../Redux/authentication/Validations/action'

import HomeNavbar from '../../Routes/HomeComponents/HomeNavbar'


class Reserve extends Component {
    constructor(props) {
        super(props)

        this.state = {
            phone: null,
            message: '',
            otp1: '',
            otp2: '',
            otp3: '',
            otp4: '',
            flag: false,
            phoneFlag: false,
            status: '',
            days: 1,
            firstName: '',
            lastName: '',
            email: '',
            fNameFlag: false,
            lNameFlag: false,
            emailFlag: false,


        }
    }
   

    componentDidMount() {
        let { dates } = this.props
        const date1 = new Date(dates.check_in);
        const date2 = new Date(dates.check_out);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // noOfDays(diffDays)
        console.log(diffDays)
        this.setState({
            days: diffDays
        })
    }


    handlePayment = async () => {
        let { data, guestCounter, dates, noOfDays } = this.props
        let { days, firstName, lastName, email } = this.state

      
        const values = querystring.parse(this.props.location.search)


        var redirectToPaymentPage = () => {
            this.props.history.push('/tripping/payment/success')
            // <Redirect to='/tripping/payment/success' />
        }

        console.log(values)
        var bookingDate = []
        bookingDate.push(values.check_in, values.check_out)



        let order_res = await axios.post("http://trippingbackend.gunjan.tech/booking/order_id", {
            "amount": ((Number(data[0].price) * days) + 100 + 200 + 400) * 100,
            "currency": "INR",
            "receipt": values.id + "#" + values.propety_name,
            "payment_capture": "1",
        })



        const options = {
            "key": "rzp_test_4iW8M3X7pbNUvK",      // Enter the Key ID generated from the Dashboard
            "amount": ((Number(data[0].price) * days) + 100 + 200 + 400) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Book Trip",
            "description": "Transaction",
            "image": "/logo.svg",
            "order_id": order_res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                console.log(response)
                let final_res = await axios.post("http://trippingbackend.gunjan.tech/booking/varification", {
                    // ...response, 
                    "razorpay_payment_id": response.razorpay_payment_id,
                    "razorpay_order_id": response.razorpay_order_id,
                    "razorpay_signature": response.razorpay_signature,
                    "property_id": data[0].property_id,
                    "amount": ((Number(data[0].price) * days) + 100 + 200 + 400) * 100,
                    "booking_date": bookingDate,
                    "guest": guestCounter,
                    email: email,
                    first_name: firstName,
                    last_name: lastName,

                })

                if (final_res.data.result == 'success') {
                    console.log('success')
                    // alert(final_res.data.message)
                    // this.props.history.push('/')

                } else {
                    console.log('failure')
                    alert(final_res.data.message)
                    redirectToPaymentPage()
                }

            },
            "prefill": {
                "name": "Uday",
                "email": "udaykiran199715@gmail.com",
                "contact": "8106454161"
            },
            // "notes": {
            //     "address": ""
            // },
            "theme": {
                "color": "#F37254"
            }
        };



        const paymentObject = new window.Razorpay(options)
        paymentObject.open()


    }

    handleOTP = () => {
        let { firstName, lastName, email, phone, fNameFlag, lNameFlag, emailFlag, phoneFlag } = this.state
        let { checkEmailFlag, emailValidation } = this.props

        if (firstName.length > 2) {
            this.setState({
                fNameFlag: false
            })
        } else {
            this.setState({
                fNameFlag: true
            })
        }

        if (lastName.length > 2) {
            this.setState({
                lNameFlag: false
            })
        } else {
            this.setState({
                lNameFlag: true
            })
        }


        //  emailValidation(email)

        //  if (!checkEmailFlag) {
        //     this.setState({
        //         emailFlag: true
        //     })

        // } else {
        //     this.setState({
        //         emailFlag: false
        //     })
        // }
     emailValidation(email)

     if (!checkEmailFlag) {
        this.setState({
            emailFlag: true
        })

    } else {
        this.setState({
            emailFlag: false
        })
    }

        if (phone && phone.length == 10) {
            this.setState({
                phoneFlag: false
            })
        } else {
            this.setState({
                phoneFlag: true
            })
        }


        //   if(fNameFlag && lNameFlag  && phoneFlag) {
        axios.get("http://trippingbackend.gunjan.tech/booking/get_otp/91" + this.state.phone)
            .then(res => {
                this.setState({
                    message: res
                })
            })

        // }

    }

    enterOTP = () => {
        let { otp1, otp2, otp3, otp4 } = this.state
        var otp = otp1 + otp2 + otp3 + otp4
        axios.get("http://trippingbackend.gunjan.tech/booking/varify_otp/" + otp)
            .then(res => res.data)
            .then(res => {
                this.setState({
                    status: res
                })
            })
    }

    render() {
        let { otp1, otp2, otp3, otp4, firstName, lastName, email, phone, fNameFlag, lNameFlag, emailFlag, phoneFlag } = this.state

        return (
            <div className='container-fluid '>
                <HomeNavbar />
                <div className='row'>
                    <div className='col-6'>

                        <div className="jumbotron" style={{ backgroundColor: "white", border: "1px solid #FB8C00", color: "#FB8C00" }}>
                            <div className="container">
                                <h6 className="font-weight-lighter">Book Tension Free</h6>
                                <ul className="font-weight-bold">
                                    <li><small>Your payments are secured by tripping</small></li>
                                    <li><small>The amounts are realeased to verified owners in advance while new owners are paid post your check-in and conformation</small></li>
                                    <li><small>You can contact us if you face any isues during checkin or your stay.</small></li>
                                </ul>
                            </div>
                        </div>

                        <div className=" offset-1 col-9 p-5 shadow">
                            <div className="row">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <h6 className="ml-3">Enter Your contact information</h6>
                            </div>
                            <form>
                                <div class="form-row mt-3">
                                    <div class="col-6">
                                        <input type="text" class="form-control" placeholder="First name" value={firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                                        {fNameFlag && <small className='text-danger'>please enter first name</small>}
                                    </div>
                                    <div class="col-6">
                                        <input type="text" class="form-control" placeholder="Last name" value={lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
                                        {lNameFlag && <small className='text-danger'>please enter last name</small>}
                                    </div>
                                    <div className="col-12 mt-3 mb-3">
                                        <input type="email" class="form-control" placeholder="Please enter your email here..." value={email} onChange={(e) => this.setState({ email: e.target.value })}></input>
                                        {emailFlag && <small className='text-danger'>please enter valid email</small>}
                                    </div>
                                </div>
                            </form>
                            {this.state.status != "verified" && !this.state.message && <>
                                <h5 className='my-3 ' style={{ color: "#FB8C00" }}>
                                    Confirm Mobile Number:
                                </h5>
                                <div className='d-flex flex-row'>
                                    <span className='border p-1 mr-3 rounded'>+91</span>
                                    <input type='Number' value={phone} placeholder="Enter mobile no..." className='form-control' onChange={(e) => this.setState({ phone: e.target.value })} />

                                </div>
                                {phoneFlag && <small className='text-danger'>please enter valid phone number</small>}

                                <button className='btn mt-2 form-control' onClick={() => this.handleOTP()} style={{ backgroundColor: "#FB8C00" }}>Get OTP</button>


                            </>}
                            {this.state.status != "verified" && this.state.message && <div>
                                <h5 className='my-3 ' style={{ backgroundColor: "#FB8C00" }}>
                                    Enter OTP:
                            </h5>
                              
                                <div className='d-flex flex-row text-center'>
                                    <input type="text" value={otp1} className="form-control py-4 text-center mx-2" maxlength="1" onChange={(e) => this.setState({ otp1: e.target.value })} />
                                    <input type="text" value={otp2} className="form-control py-4 text-center mx-2" maxlength="1" onChange={(e) => this.setState({ otp2: e.target.value })} />
                                    <input type="text" value={otp3} className="form-control py-4 text-center mx-2" maxlength="1" onChange={(e) => this.setState({ otp3: e.target.value })} />
                                    <input type="text" value={otp4} className="form-control py-4 text-center mx-2" maxlength="1" onChange={(e) => this.setState({ otp4: e.target.value })} />
                                </div>

                                <p className='text-center mt-2' onClick={() => this.handleOTP()}>ResendOTP</p>
                                <button className='btn mt-3' onClick={() => this.enterOTP()} style={{ backgroundColor: "#FB8C00" }}>Submit</button>

                            </div>
                            }
                            <br />

                            {this.state.status == "verified" && <div>
                                <div className='d-flex flex-row'>
                                    <input type='checkbox' className='mt-1 w-20 h-20' />
                                    <span className='ml-3'>I Agree all the terms and conditions</span>
                                </div>
                                <button className="btn btn-block reserve my-3" onClick={() => this.handlePayment()} style={{ backgroundColor: "#FB8C00" }} >Procedd to Pay</button>

                                {/* <button className="btn btn-block reserve my-3" onClick={()=> this.handlePayment()}>Procedd to Pay</button> */}
                            </div>}
                        </div>

                    </div>
                    <div className='offset-1 col-4 mt-5 shadow p-5 '>
                        <BillingCard location={this.props.location} days={this.state.days} />
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    data: state.entity.data,
    review: state.entity.review,
    recommendations: state.entity.recommendations,
    guestCounter: state.search.guestCounter,
    dates: state.search.dates,
    checkEmailFlag: state.validation.checkEmailFlag,
})

const mapDispatchToProps = dispatch => ({
  
    noOfDays: (payload) => dispatch(noOfDays(payload)),
    emailValidation: (payload) => dispatch(emailValidation(payload)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Reserve)