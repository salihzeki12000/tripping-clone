import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Register from './Authentication/Register'
import Signin from './Authentication/Signin'

function Routes() {
    return (
        <div>

            <Switch>
            <Route path='/' exact render={()=> <Home />} />
            <Route path='/vacation-rentals'  />
            <Route path='/register' exact render={()=> <Register />} />
            <Route path='/signin' exact render={()=> <Signin />} />
            </Switch>
        </div>
    )
}

export default Routes
