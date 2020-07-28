import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Modal from 'react-modal';
import CounterComponent from './CounterComponent';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
import { getImageRequest, getDataRequest, getReviewRequest, getRecommendRequest } from '../../Redux/EntityAPI/Action'
import querystring from 'query-string';
Modal.setAppElement('#root');
 class TempCard extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            data:""
        }
    }
  async  componentDidMount() {
        console.log('enter')
        const values = querystring.parse(this.props.location.search)

        console.log(values)
        this.setState({
            data:"uday"
        })

        const { getImageRequest, getDataRequest, getReviewRequest } = this.props

               await getImageRequest(Number(values.id))
              await  getReviewRequest(Number(values.id))
             await   getDataRequest({id:Number(values.id), room_type: values.accomodation })
              await  getRecommendRequest({id:Number(values.id), room_type: values.accomodation })
    }


    handleClick = () => {
        let { click, counter } = this.state
        this.setState({
            click: !click,
            counter: !counter
        })
    }

    render() {
      
        let { user, images, review, data, recommendations } = this.props;
        let { startDate, endDate, click, open, counter } = this.state
        console.log(images , data , review , recommendations)

        return (
            <div>
                {this.state.data}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.signup.user,
    images: state.entity.images,
    data: state.entity.data,
    review: state.entity.review,
    recommendations:state.entity.recommendations
})

const mapDispatchToProps = dispatch => ({
    getImageRequest: (payload) => dispatch(getImageRequest(payload)),
    getDataRequest: (payload) => dispatch(getDataRequest(payload)),
    getReviewRequest: (payload) => dispatch(getReviewRequest(payload)),
    getRecommendRequest: (payload) => dispatch(getRecommendRequest(payload))

})

export default connect(mapStateToProps, mapDispatchToProps)(TempCard)

