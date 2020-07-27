import React, { Component } from 'react'

// if(document.domain == 'localhost') {
//     //test key
// }else {
//     //development key
// }


export default class Payment extends Component {
      constructor(props) {
          super(props)
          this.state = {
              name:''
          }
      }

      handlePayment =  () => {
        const options = {
            "key":  "rzp_test_d5R0zL10uvQrV4" ,      // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Book Trip",
            "description": "Transaction",
            "image": "/logo.svg",
            "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": {
                // "name": "",
                // "email": "",
                // "contact": ""
            },
            // "notes": {
            //     "address": ""
            // },
            // "theme": {
            //     "color": "#F37254"
            // }
        };

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
      }

    render() {
        return (
            <div>
                <button onClick={()=> this.handlePayment()}>pay</button>
            </div>
        )
    }
}
