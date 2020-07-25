import React, { Component } from 'react'
// import Slider from 'react-rangeslider'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from './PriceFilter.module.css'

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
            price:100
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
        return (
            // <div >
            //     <Slider
            //     defaultValue={this.state.price}
            //     aria-labelledby="discrete-slider"
            //        min={500}
            //        max={40000}
            //        value={this.state.price}
            //        onChange={() => this.handleonChange()}
            //     //    classes={styles.wrapper}
            //      />
            // </div>

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
        )
    }
}
