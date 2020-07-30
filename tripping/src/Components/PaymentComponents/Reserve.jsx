import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BillingCard from './BillingCard'
import {connect} from 'react-redux'
import axios from 'axios'
import querystring from 'query-string';
// import OTPInput, { ResendOTP } from "otp-input-react";


class Reserve extends Component {
       constructor(props) {
           super(props)

           this.state ={
               phone:null,
               message:'',
               otp:'',
               flag :false,
               phoneFlag:false,
               status:'',
               
           }
       }

handlePayment = async () => {
    const values = querystring.parse(this.props.location.search)

    console.log(values)
    var bookingDate = []
    bookingDate.push(values.check_in, values.check_out)
 
    let {data, guestCounter} = this.props
    
    let order_res = await axios.post("https://0e332314fd66.ngrok.io/booking/order_id", {
        "amount": Number(data[0].price)*3 + 100 + 200 + 300,
        "currency": "USD",
        "receipt": values.id + "#" + values.propety_name,
        "payment_capture": "1",
     

    })

    

    const options = {
        "key": "rzp_test_deyJ8kZP9d4HEh",      // Enter the Key ID generated from the Dashboard
        "amount": (Number(data[0].price)*guestCounter + 100 + 200 + 300)*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "USD",
        "name": "Book Trip",
        "description": "Transaction",
        "image": "/logo.svg",
        "order_id": order_res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
            console.log(response)
            let final_res = await axios.post("https://0e332314fd66.ngrok.io/booking/varification", {
               // ...response, 
                 "razorpay_payment_id": response.razorpay_payment_id, 
                 "razorpay_order_id":response.razorpay_order_id ,
                  "razorpay_signature":response.razorpay_signature ,
                  "property_id":data[0].property_id, 
                  "amount":Number(data[0].price)*guestCounter + 100 + 200 + 300, 
                  "booking_date":bookingDate,
                  "guest":guestCounter
            })

            if (final_res.data.result == 'success') {
                console.log('success')
                alert(final_res.data.message)
                this.props.history.push('/')
            } else {
                alert(final_res.data.message)
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
     axios.get("https://0e332314fd66.ngrok.io/booking/get_otp/91"+ this.state.phone)
     .then(res => {
         this.setState({
             message:"sdfsdfsd"
         })
     })
}

enterOTP = () => {
    axios.get("https://0e332314fd66.ngrok.io/booking/varify_otp/" + this.state.otp)
    .then(res => res.data)
    .then(res => {
        this.setState({
            status:res
        })
    })
}

    render() {
   

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
                            <h3 className='my-3'>
                                Confirm Mobile Number:
                            </h3>
                        { this.state.status != "verified" && !this.state.message && <>
                             <input type='Number' value={this.state.phone} className='' onChange={(e)=> this.setState({phone:e.target.value})} />
                             
                             <button className='btn btn-info px-2 ml-2' onClick={()=> this.handleOTP()} >Get OTP</button>

                        
                    </>}
                    {this.state.status != "verified" && this.state.message&& <div>
                        <input type='Number' value={this.state.otp} className='' onChange={(e)=> this.setState({otp:e.target.value})} />
                             
                             <button className='btn btn-info px-2 ml-2' onClick={()=> this.enterOTP()} >Submit</button>

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
                        </div>
                          
                        }
                            <br />

                    
                        { this.state.status =="verified" && <div> <button className="btn btn-block reserve my-3" onClick={()=> this.handlePayment()}>Procedd to Pay</button>
                        
                        {/* <button className="btn btn-block reserve my-3" onClick={()=> this.handlePayment()}>Procedd to Pay</button> */}
                        </div> }
                        </div>
                        <div className='col-5 offset-1 '>
                            <BillingCard />
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