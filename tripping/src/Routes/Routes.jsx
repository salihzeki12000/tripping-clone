import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Register from './Authentication/Register'
import Signin from './Authentication/Signin'
import VacationRentalsSearch from './VacationRentalsSearch'
import DetailsCard from '../Components/Card/DetailsCard'

function Routes() {
    return (
        <div>

            <Switch>
            <Route path='/' exact render={()=> <Home />} />
            <Route path='/vacation-rentals/s/:id' render= {(props)=> <VacationRentalsSearch {...props} />} />
            <Route path='/register' exact render={()=> <Register />} />
            <Route path='/signin' exact render={(props)=> <Signin />} />
            <Route path='/detailscard/:id'  render={(props)=> <DetailsCard />} />
            </Switch>
        </div>
    )
}

export default Routes