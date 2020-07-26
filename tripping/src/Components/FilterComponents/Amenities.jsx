import React from 'react'
import './Amenities.css'
import {connect} from 'react-redux'
import Modal from 'react-modal';
Modal.setAppElement('#root');

let amenites = [{ logo: "fa fa-wifi", name: "Internet", id: "internet" }, { logo: "fa fa-cutlery", name: "Kitchen", id: "kitchen" },
{ logo: "fas fa-swimming-pool", name: "Pool", id: "pool" }, { logo: "fa fa-television", name: "TV", id: "tv" },
{ logo: "far fa-snowflake", name: "Air Conditioning", id: "air_conditioning" }, { logo: "fas fa-fan", name: "Washer", id: "washer" },
{ logo: "fas fa-door-closed", name: "Balcony/Patio", id: "balacony" }, { logo: "fas fa-dog", name: "Pet allowed", id: "pet_allowed" },
{ logo: "fas fa-fire", name: "Fireplace", id: "fireplace" }, { logo: "fa-fa-glass", name: "Dishwasher", id: "dis_watcher" }, { logo: "fas fa-paw", name: "No pets", id: "no_pets" },
{ logo: "fas fa-smoking", name: "Smoking", id: "smoking" }, { logo: "fas fa-smoking-ban", name: "No Smoking", id: "no_smoking" },
{ logo: "fas fa-hot-tub", name: "Jacuzzi", id: "jacuzzi" }, { logo: "fas fa-fish", name: "Fishing", id: "fishing" }

]

 class Amenities extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amenities:[],
            open: false
        }
    }

    handleonChange = () => {
        if (e.target.checked) {
            this.setState({
                amenities: [...this.state.amenities, e.target.id]
            })
        }
        else {
            this.setState({
                amenities: this.state.amenities.filter(item => item !== e.target.id)
            })
        }
    }

    handleAplly = async () =>  {
        let { country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities, getDataFromAPI, changeFreeCancellation, history } = this.props

        await  getDataFromAPI(country, state, city, checked, rating, bedroom, guest, sort, price, aminities.join(','))

        if(!values["aminities"]) {
            history.push(`?aminities=${aminities.join[',']}`)
           }
    }


    render() {
        const { open } = this.state
        return (
            <div>
                <span onClick={() => this.setState({ open: !open })} className="px-3">Amenities</span>

                <Modal
                    isOpen={open}
                    style={{
                        content: {
                            position: 'absolute',
                            top: '100px',
                            left: '60px',
                            right: '40px',
                            width: '46rem',
                            height: '28rem',
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
                    <div className='container-fluid'>
                        <div className='d-flex flex-row fontSizeAmenities'>
                            <div className='mr-5 '>
                                <div className='d-flex flex-row'>
                                    <div> <i class="fa fa-bed text-secondary mr-1" aria-hidden="true "></i> Bedrooms</div>
                                    <div className='ml-5 qtyDiv qtyDivDec mr-3'>-</div>
                                    <div>1</div>
                                    <div className='qtyDiv qtyDivInc ml-3'>+</div>
                                </div>
                            </div>
                            <div className=' '>
                                <div className='d-flex flex-row'>
                                    <div> <i class="fa fa-shower" aria-hidden="true"></i> Bathrooms</div>
                                    <div className='ml-5 qtyDiv qtyDivDec mr-3'>-</div>
                                    <div>1</div>
                                    <div className='qtyDiv qtyDivInc ml-3'>+</div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <br />
                        <div className='clear-both '></div>
                        <div className='text-secondary mt-3 font-weight-bold '>AMENITIES</div>
                        <div className='d-flex flex-row mt-3'>
                            <div className='row inputTagFilters'>
                                {amenites.map(item => {
                                    return (
                                        <div key={item.logo} className='col-4 my-2'>
                                            <input className='checkAmenities ' id={item.id} type='checkbox' onChange={this.handleChange} />
                                            <i className={`px-2 ${item.logo}`}></i>
                                            <span className='fontSizeAmenities'>{item.name}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                   <span onClick={() => this.setState({ open: !open })}>close</span>
                    <button className='btn btn-warning float-right mr-2 mt-2'  >Apply</button>
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
    // changeFreeCancellation: (payload) => dispatch(changeFreeCancellation(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Amenities)