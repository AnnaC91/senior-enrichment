
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; //not sure if i'll need these yet
import { connect } from 'react-redux';
import { withRouter } from 'react-router'; //^*

//import store from '../store/index';

export default function Home (){
    return(
        <div>
            <h1>Home Page</h1>
        </div>
    )
}