import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


export default class Payment extends Component {
      constructor(props) {
          super(props)
          this.state = {
              name:'',
              flag:false
          }
      }

        
      componentDidMount() {
          console.log('enter')
           setTimeout(()=> {
               console.log('check')
               this.props.history.push('/')
        }, 4000)
      }


    render() {

        // setTimeout(()=> {
        //     <Redirect to='/' />
        // }, 5000)

        // if(flag) {
        //     <Redirect to='/' />
        // }
            
        return (
            <div className='text-center'>
                <div className='text-center text-success mt-5' style={{fontSize:"100px"}}>

                  <i class="fa fa-check-circle " aria-hidden="true"></i>
                  <h2 className='mt-4'>Payment succesful.</h2>
                  
                </div>
                <h5>You will be redirected to home in few seconds</h5>
            </div>
        )
    }
}
