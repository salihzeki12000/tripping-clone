import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux'
import './FreeCancellation.css';
import './FileNavBar.css';
import './RatingFilter.css'
import { getDataFromAPI, changeFreeCancellation } from '../../Redux/SearchApi/Action.js'

Modal.setAppElement('#root');
class FreeCancellation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            checked: false
        }
    }

  handleClick = async () => {
        let { country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities, getDataFromAPI, changeFreeCancellation, history } = this.props
        let { checked } = this.state
        console.log(history)
        if (checked == true) {
            checked = 1

        } else {
            checked = ''
        }
        
      await changeFreeCancellation(checked)

      await  getDataFromAPI(country, state, city, checked, rating, bedroom, guest, sort, price, aminities)
        this.setState({
            open: !this.state.open
        })
     
//         if(changeFreeCancellation(checked) == checked) {
// console.log('checked')
            history.push(`?freecancellation=${checked}`)
//         }

    }


    handleUrlChange = (query) => {
        let { country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities, getDataFromAPI, changeFreeCancellation, history } = this.props

        const url = new URLSearchParams(query)

        console.log(url.get('free_cancellation'), 'enter' )

        this.setState({
            checked: url.get('free_cancellation')
        })

        getDataFromAPI(country, state, city, this.state.checked, rating, bedroom, guest, sort, price, aminities)
    }
  componentDidMount() {
        const { location } = this.props
        this.handleUrlChange(location.search)
    }

  


    // componentWillReceiveProps(newProps) {
    //     const { location } = newProps
    //     let { free_cancellation, rating, history } = this.props
    //     console.log(newProps)
    //     console.log(location.pathname, this.props.location.pathname)
    //     if (location.search === this.props.location.search) {
    //         this.handleUrlChange(location.search)
    //         history.push(`?freecancellation=${free_cancellation}&rating=${rating}`)
    //     }
    // }


    render() {
        let { free_cancellation, rating, history } = this.props
        const { open, checked } = this.state


        // free_cancellation ? history.push(`?freecancellation=${free_cancellation}&rating=${rating}`) : ""

        return (
            <div>
                <span onClick={() => this.setState({ open: !open })} className="px-3">Free Cancellation</span>
                <Modal
                    isOpen={open}
                    style={{
                        content: {
                            position: 'absolute',
                            top: '100px',
                            left: '400px',
                            right: '40px',
                            width: '15rem',
                            height: '12rem',
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
                    <div className="row">
                        <div className="col-2"><input onChange={() => this.setState({ checked: !checked })} type="checkbox" /></div>
                        <div className="col-10">
                            <p>Free Cancellation</p>
                            <small className="text-muted">Only shows offers which have free cancellation policy</small>
                        </div>
                    </div>
                    {/* <button onClick={()=> this.handleApply()}>Apply</button> */}
                    <button onClick={() => this.handleClick()} style={{ float: 'right' }} className="close">Apply</button>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    country: state.data.country,
    state: state.data.state,
    city: state.data.city,
    free_cancellation: state.data.free_cancellation,
    rating: state.data.rating,
    bedroom: state.data.bedroom,
    guest: state.data.guest,
    sort: state.data.sort,
    price: state.data.price,
    aminities: state.data.aminities
})
const mapDispatchToProps = dispatch => ({
    getDataFromAPI: (country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities) => dispatch(getDataFromAPI(country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities)),
    changeFreeCancellation: (payload) => dispatch(changeFreeCancellation(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(FreeCancellation)