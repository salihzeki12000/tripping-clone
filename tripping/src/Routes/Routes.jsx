import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Register from './Authentication/Register'
import Signin from './Authentication/Signin'
import VacationRentalsSearch from './VacationRentalsSearch'
import DetailsCard from '../Components/Card/DetailsCard'
import Reserve from '../Components/PaymentComponents/Reserve'
import ReactGA from 'react-ga';
import PaymentSuccess from '../Components/PaymentSuccess'

function Routes() {
    ReactGA.initialize('UA-173994542-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    return (
        <div>
            <Switch>
            <Route path='/' exact render={()=> <Home />} />
            <Route path='/vacation-rentals/s/:id' render= {(props)=> <VacationRentalsSearch {...props} />} />
            <Route path='/register' exact render={()=> <Register />} />
            <Route path='/signin' exact render={(props)=> <Signin />} />
            <Route path='/detailscard/:id'  render={(props)=> <DetailsCard {...props} />} />
            <Route path='/payment/:id'  render={(props)=> <Reserve {...props} />} />
            <Route path='tripping/payment/success' render={(props)=> <PaymentSuccess />} />
            </Switch>
        </div>
    )
}

export default Routes