
//importing
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

//importing from custom components
import Home from './Home'
import Campuses from './Campus/Campuses'
import Campus from './Campus/Campus'
import NewCampus from './Campus/NewCampus'
import EditCampus from './Campus/EditCampus'
import Students from './Student/Students'
import Student from './Student/Student'
import NewStudent from './Student/NewStudent'
import EditStudent from './Student/EditStudent'
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
                <h1><Link to={`/`}>Welcome!</Link></h1>
                <Navigation />
                <main>
                    <Switch>
                        <Route exact path='/campuses' component={Campuses} />
                        <Route exact path='/new-campus' component={NewCampus} />
                        <Route path='/campuses/:campusId/edit' component={EditCampus} />
                        <Route path='/campuses/:campusId' component={Campus} />
                        <Route exact path='/students' component={Students} />
                        <Route exact path='/new-student' component={NewStudent} />
                        <Route path='/students/:studentId/edit' component={EditStudent} />
                        <Route path='/students/:studentId' component={Student} />
                        <Route exact path='/' component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </div>
        )
    }
}