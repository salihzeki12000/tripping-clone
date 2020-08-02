import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import BillingCard from './BillingCard'
import { connect } from 'react-redux'
import axios from 'axios'
import querystring from 'query-string';
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

        }
    }
    // axios.get("https://42dc6de86567.ngrok.io/booking/varify_otp/" + this.state.otp)
    //     .then(res => res.data)
    //     .then(res => {
    //         this.setState({
    //             status: res
    //         })
    //     })
    handlePayment = async () => {



        const values = querystring.parse(this.props.location.search)


        var redirectToPaymentPage = () => {
            this.props.history.push('/tripping/payment/success')
            // <Redirect to='/tripping/payment/success' />
        }

        console.log(values)
        var bookingDate = []
        bookingDate.push(values.check_in, values.check_out)

        let { data, guestCounter } = this.props

        let order_res = await axios.post("https://ec285aed79cd.ngrok.io/booking/order_id", {
            "amount": ((Number(data[0].price) * guestCounter) + 100 + 200 + 400) * 100,
            "currency": "INR",
            "receipt": values.id + "#" + values.propety_name,
            "payment_capture": "1",
        })



        const options = {
            "key": "rzp_test_4iW8M3X7pbNUvK",      // Enter the Key ID generated from the Dashboard
            "amount": ((Number(data[0].price) * guestCounter) + 100 + 200 + 400) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
                let final_res = await axios.post("https://ec285aed79cd.ngrok.io/booking/varification", {
                    // ...response, 
                    "razorpay_payment_id": response.razorpay_payment_id,
                    "razorpay_order_id": response.razorpay_order_id,
                    "razorpay_signature": response.razorpay_signature,
                    "property_id": data[0].property_id,
                    "amount": ((Number(data[0].price) * guestCounter) + 100 + 200 + 400) * 100,
                    "booking_date": bookingDate,
                    "guest": guestCounter
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
        axios.get("https://ec285aed79cd.ngrok.io/booking/get_otp/91" + this.state.phone)
            .then(res => {
                this.setState({
                    message: res
                })
            })



    }

    enterOTP = () => {
        let { otp1, otp2, otp3, otp4 } = this.state
        var otp = otp1 + otp2 + otp3 + otp4
        axios.get("https://ec285aed79cd.ngrok.io/booking/varify_otp/" + otp)
            .then(res => res.data)
            .then(res => {
                this.setState({
                    status: res
                })
            })


    }

    render() {
        let { otp1, otp2, otp3, otp4 } = this.state

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
                                        <input type="text" class="form-control" placeholder="First name" />
                                    </div>
                                    <div class="col-6">
                                        <input type="text" class="form-control" placeholder="Last name" />
                                    </div>
                                    <div className="col-12 mt-3 mb-3">
                                        <input type="email" class="form-control" placeholder="Please enter your email here..."></input>
                                    </div>
                                </div>
                            </form>
                            {this.state.status != "verified" && !this.state.message && <>
                                <h5 className='my-3 ' style={{ color: "#FB8C00" }}>
                                    Confirm Mobile Number:
                                </h5>
                                <div className='d-flex flex-row'>
                                    <span className='border p-1 mr-3 rounded'>+91</span>
                                    <input type='Number' value={this.state.phone} placeholder="Enter mobile no..." className='form-control' onChange={(e) => this.setState({ phone: e.target.value })} />
                                </div>

                                <button className='btn mt-2 form-control' onClick={() => this.handleOTP()} style={{ backgroundColor: "#FB8C00" }}>Get OTP</button>


                            </>}
                            {this.state.status != "verified" && this.state.message && <div>
                                <h5 className='my-3 ' style={{ backgroundColor: "#FB8C00" }}>
                                    Enter OTP:
                            </h5>
                                {/* <input type='Number' value={this.state.otp} className='' onChange={(e) => this.setState({ otp: e.target.value })} />

                                <button className='btn btn-secondary px-2 ml-2' onClick={() => this.enterOTP()} >Submit</button> */}

                                {/* <OTPInput
                            value={OTP}
                            onChange={setOTP}
                            autoFocus
                            OTPLength={4}
                            otpType="number"
                            disabled={false}
                            secure
                          />
                          <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}
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
                        <BillingCard location={this.props.location} />
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    user: state.signup.user,
    images: state.entity.images,
    data: state.entity.data,
    review: state.entity.review,
    recommendations: state.entity.recommendations,
    guestCounter: state.search.guestCounter,
})

// const mapDispatchToProps = dispatch => ({
//     getImageRequest: (payload) => dispatch(getImageRequest(payload)),
//     getDataRequest: (payload) => dispatch(getDataRequest(payload)),
//     getReviewRequest: (payload) => dispatch(getReviewRequest(payload)),
//     getRecommendRequest: (payload) => dispatch(getRecommendRequest(payload))

// })

export default connect(mapStateToProps, null)(Reserve)