import React, { Component } from 'react';
import Modal from 'react-modal';
import './FreeCancellation.css';
import './FileNavBar.css';
import './RatingFilter.css'

Modal.setAppElement('#root');
export class FreeCancellation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            checked:false
        }
    }

    handleClick = () => {

        let {history} = this.props
        console.log(history)
        

        this.setState({
            open:!this.state.open
        })
    }

    render() {
        const { open, checked } = this.state
        return (
            <div>
                <button onClick={()=>this.setState({ open: true })} className="filter">Free Cancellation</button>
                <Modal
                    isOpen={open}
                    style={{
                        content: {
                          position: 'absolute',
                          top: '260px',
                          left: '60px',
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
                        <div className="col-2"><input onChange={()=> this.setState({checked: !checked})} type="checkbox"/></div>
                        <div className="col-10">
                            <p>Free Cancellation</p>
                            <small className="text-muted">Only shows offers which have free cancellation policy</small> 
                        </div>
                    </div>
                    {/* <button onClick={()=> this.handleApply()}>Apply</button> */}
                    <button onClick={()=>this.handleClick()} style={{float: 'right'}} className="close">Apply</button>
                </Modal>
            </div>
        )
    }
}

export default FreeCancellation
