
//importing
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//importing from custom components
import Home from './Home'
import Campuses from './Campuses'
import Campus from './Campus'
import Students from './Students'
import Student from './Student'
import Navigation from './Navigation'
import NotFound from './NotFound'

//importing from reducers
import store, { fetchCampuses, fetchStudents } from '../reducers';

export default class Main extends Component {

    componentDidMount(){
        store.dispatch(fetchCampuses());
        store.dispatch(fetchStudents());
    }

    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <Navigation />
                <main>
                    <Switch>
                        <Route exact path='/campuses' component={Campuses} />
                        <Route path='/campuses/:campusId' component={Campus} />
                        <Route exact path='/students' component={Students} />
                        <Route path='/students/:studentId' component={Student} />
                        <Route exact path='/' component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </div>
        )
    }
}