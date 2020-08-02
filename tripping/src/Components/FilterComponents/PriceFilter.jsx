import React, { Component } from 'react'
// import Slider from 'react-rangeslider'
import { connect } from 'react-redux';
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from './PriceFilter.module.css'
import Modal from 'react-modal';
import querystring from 'query-string';
import { getDataFromAPI } from '../../Redux/SearchApi/Action';


Modal.setAppElement('#root');

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

class PriceFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: 100,
      open: false,
      // min:null,
      // max:null
    }
  }

  handleonChange = (e, value) => {
    console.log(value)
    this.setState({
      price: value
    })
  }

  handlePrice = () => {
    this.setState({
      open: !this.state.open
    })
    // console.log('handle Price')
    // let { history, getDataFromAPI, location } = this.props
    // console.log(location, 'path')
    // let { loc, free_cancellation, rating, bedroom, guest, sort, price, aminities } = this.props
    // const values = querystring.parse(this.props.location.search)
    // console.log(values)
    // // let x = Object.keys(values)

    // if (values['price']) {
    //   console.log('if')
    //   price = this.state.price
    // }
    // else {
    //   console.log('else')

    //   price = this.state.price
    //   var url = location.search + `&price=${this.state.price}`
    //   history.push(url)
    // }


    // for (var key in values) {
    //   if (key == "location") {
    //     loc = values[key]
    //   }
    //   else if (key == "free_cancellation") {
    //     free_cancellation = Number(values[key])
    //   }
    //   else if (key == 'guest') {
    //     guest = Number(values[key])
    //   }
    //   else if (key == 'bedroom') {
    //     bedroom = Number(values[key])
    //   }
    //   else if (key == "rating") {
    //     rating = Number(values[key])
    //   }
    //   else if (key == "free_cancellation") {
    //     if (typeof (values[key]) != "number") {
    //       free_cancellation = ''
    //     } else {
    //       free_cancellation = Number(values[key])
    //     }
    //   }
    //   else if (key == "aminities") {
    //     aminities = values[key]
    //   }

    // }

    // getDataFromAPI(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities)
    const values = querystring.parse(this.props.location.search)
    console.log(values)
    let { history, getDataFromAPI, location } = this.props
    getDataFromAPI(values.location, values.check_in, values.check_out, values.free_cancellation, values.rating, values.bedroom, values.guest, values.sort, `0,${this.state.price}`, values.aminities, values.page, values.per_page, values.accomodation_type)
    var url = `/vacation-rentals/s/search?location=${values.location}&check_in=${values.check_in}&check_out=${values.check_out}&guest=${values.guest}&bedroom=${values.bedroom}&rating=${values.rating}&aminities=${values.aminities}&page=${values.page}&per_page=${values.per_page}&accomodation_type=${values.accomodation_type}&free_cancellation=${values.free_cancellation}&price=${`0,${this.state.price}`}`
            
    history.push(url)

  }


  render() {
    // const classes = useStyles()
    const { open } = this.state
    return (

      <div>
        <span onClick={() => this.setState({ open: !open })} 
        className="m-2 p-2 pl-3 pr-3 rounded-pill filter font-weight-lighter">Price</span>

        <Modal
          isOpen={open}
          style={{
            content: {
              position: 'absolute',
              top: '100px',
              left: '60px',
              right: '40px',
              width: '15rem',
              height: '10rem',
              bottom: '40px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}
        >
          <div className={styles.wrapper}>
            <Typography id="discrete-slider-always" gutterBottom>
              Per Night
            </Typography>
            {/* <h5 className='font-weight-bold text-dark'>₹500 - ₹40000</h5> */}
            <Slider
              // defaultValue={this.state.value}
              min={0}
              max={5000}
              aria-labelledby="discrete-slider-always"

              value={this.state.value}
              onChange={this.handleonChange}
              valueLabelDisplay="on"
            />
          </div>
          <div className='float-right'>

            <button className='btn btn-secondary mx-2 mt-2' onClick={() => this.setState({ open: !open })}>close</button>
            <button className='btn btn-warning  mr-2 mt-2' onClick={() => this.handlePrice()} >Apply</button>
          </div>
        </Modal>

      </div>
    )
  }
}


const mapStateToProps = state => ({
  loc: state.data.loc,
  free_cancellation: state.data.free_cancellation,
  rating: state.data.rating,
  bedroom: state.data.bedroom,
  guest: state.data.guest,
  sort: state.data.sort,
  price: state.data.price,
  aminities: state.data.aminities,
  data: state.data.data
})

const mapDispatchToProps = dispatch => ({
  getDataFromAPI: (loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page, accomodation_type) => dispatch(getDataFromAPI(loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page, accomodation_type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PriceFilter)
