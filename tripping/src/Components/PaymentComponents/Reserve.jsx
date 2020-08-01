import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import BillingCard from './BillingCard'
import { connect } from 'react-redux'
import axios from 'axios'
import querystring from 'query-string';



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

        let order_res = await axios.post("https://f5cf6c72dae5.ngrok.io/booking/order_id", {
            "amount": ((Number(data[0].price) * guestCounter) + 100 + 200 + 400)*100,
            "currency": "INR",
            "receipt": values.id + "#" + values.propety_name,
            "payment_capture": "1",


        })



        const options = {
            "key": "rzp_test_4iW8M3X7pbNUvK",      // Enter the Key ID generated from the Dashboard
            "amount": ((Number(data[0].price) * guestCounter) + 100 + 200 + 400)*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
                let final_res = await axios.post("https://f5cf6c72dae5.ngrok.io/booking/varification", {
                    // ...response, 
                    "razorpay_payment_id": response.razorpay_payment_id,
                    "razorpay_order_id": response.razorpay_order_id,
                    "razorpay_signature": response.razorpay_signature,
                    "property_id": data[0].property_id,
                    "amount": ((Number(data[0].price) * guestCounter) + 100 + 200 + 400)*100,
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
        // axios.get("https://f5cf6c72dae5.ngrok.io/booking/get_otp/91" + this.state.phone)
        //     .then(res => {
        //         this.setState({
        //             message: res
        //         })
        //     })


        this.setState({
            message: 'dfs'
        })
    }

    enterOTP = () => {
    //     let {otp1, otp2,otp3,otp4} = this.state
    //   var otp = otp1+otp2+otp3+otp4
    //     axios.get("https://f5cf6c72dae5.ngrok.io/booking/varify_otp/" + otp)
    //         .then(res => res.data)
    //         .then(res => {
    //             this.setState({
    //                 status: res
    //             })
    //         })

        this.setState({
             status:"verified"
        })
    }

    render() {
        let {otp1, otp2,otp3,otp4} = this.state

        return (
            <div className='container-fluid '>
                <br />
                <div className='d-flex flex-row mx-2'>
                    <Link to='/'><img src='/logo1.png' alt='/' width='80px' height='30px' /></Link>
                    <h5 className='mx-5 text-secondary '>Payment</h5>
                </div>

                <div className='container mt-3'>
                    <div className='row'>
                        <div className='col-5'>

                            {this.state.status != "verified" && !this.state.message && <>
                                <h3 className='my-3 text-muted'>
                                    Confirm Mobile Number:
                            </h3>
                                <div className='d-flex flex-row'>
                                    <span className='border p-2 mr-3'>+91</span>
                                    <input type='Number' value={this.state.phone} className='form-control' onChange={(e) => this.setState({ phone: e.target.value })} />
                                </div>


                                <button className='btn btn-info px-2  my-3 form-control' onClick={() => this.handleOTP()} >Get OTP</button>


                            </>}
                            {this.state.status != "verified" && this.state.message && <div>
                                <h3 className='my-3 text-muted'>
                                    Enter OTP:
                            </h3>
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
                                    <input type="text" value={otp1} class="form-control py-4 text-center mx-2" maxlength="1" onChange={(e)=> this.setState({otp1:e.target.value}) } />
                                    <input type="text" value={otp2} class="form-control py-4 text-center mx-2" maxlength="1" onChange={(e)=> this.setState({otp2:e.target.value}) } />
                                    <input type="text" value={otp3} class="form-control py-4 text-center mx-2" maxlength="1" onChange={(e)=> this.setState({otp3:e.target.value}) } />
                                    <input type="text" value={otp4} class="form-control py-4 text-center mx-2" maxlength="1" onChange={(e)=> this.setState({otp4:e.target.value}) } />
                                </div>

                                <p className='text-center text-info my-2 text-decoration-underline' onClick={() => this.handleOTP()}>ResendOTP</p>
                                <button className='btn btn-secondary form-control px-2 ml-2' onClick={() => this.enterOTP()} >Submit</button>

                            </div>
                            }
                            <br />

                            {this.state.status == "verified" && <div> 
                                <div className='d-flex flex-row'>
                                <input type='checkbox' className='mt-1 w-20 h-20' /> 
                                <span className='ml-3'>I Agree all the terms and conditions</span>
                                </div>
                            <button className="btn btn-block reserve my-3" onClick={() => this.handlePayment()}>Procedd to Pay</button>

                                {/* <button className="btn btn-block reserve my-3" onClick={()=> this.handlePayment()}>Procedd to Pay</button> */}
                            </div>}
                        </div>
                        <div className='col-5 offset-1 '>
                            <BillingCard location={this.props.location} />
                        </div>
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