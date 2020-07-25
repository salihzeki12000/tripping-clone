import React, { Component } from 'react'
// import Slider from 'react-rangeslider'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from './PriceFilter.module.css'
import Modal from 'react-modal';


Modal.setAppElement('#root');

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

export default class PriceFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: 100,
      open:false
    }
  }

  handleonChange = (value) => {
    console.log(value)
    this.setState({
      price: value
    })
  }
  render() {
    // const classes = useStyles()
    const {open} = this.state
    return (
   
      <div>
        <button onClick={() => this.setState({ open: !open })} className="filter">Price</button>

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
          <div className={styles.wrapper}>
            <Typography id="discrete-slider-always" gutterBottom>
              Always visible
            </Typography>
            <Slider
              defaultValue={80}
              min={500}
              max={40000}
              aria-labelledby="discrete-slider-always"
              step={5}
              onChange={() => this.handleonChange()}
              valueLabelDisplay="on"
            />
          </div>

           <button className='btn btn-warning' onClick={() => this.setState({ open: !open })}>Close</button>
        </Modal>

      </div>
    )
  }
}
