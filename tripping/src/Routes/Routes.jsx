import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Register from './Register.jsx'

function Routes() {
    return (
        <div>

            <Switch>
            <Route path='/' exact render={()=> <Home />} />
            <Route path='/vacation-rentals'  />
            <Route path='/register' exact render={()=> <Register />} />
            </Switch>
        </div>
    )
}

export default Routes
