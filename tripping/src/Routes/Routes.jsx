import React from 'react'
import {Route} from 'react-router-dom'
import Home from './Home'

function Routes() {
    return (
        <div>
            <Route path='/' exact componet={Home} />
            <Route path='/vacation-rentals'  />
        </div>
    )
}
