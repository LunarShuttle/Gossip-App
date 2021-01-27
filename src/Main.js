import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import {Switch , Route} from 'react-router-dom';
import Home from './Home'
import ChatLayout from './ChatLayout'
function Main() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path="/chat/:id" component={ChatLayout}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Main
