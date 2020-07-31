import React, { Component } from 'react'
import axios from 'axios'

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

        // try {
        //     let order_res = await axios.post("")
        // }


    render() {
        return (
            <div>
                <button onClick={this.props.handlePayment}>pay</button>
            </div>
        )
    }
}
