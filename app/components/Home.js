
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; //not sure if i'll need these yet
import { connect } from 'react-redux';
import { withRouter } from 'react-router'; //^*

//import store from '../store/index';

export default function Home (){
    return(
        <div>
            <h1>Welcome to Margaret Hamilton Interplanetary Academy of JavaScript</h1>
            <img src='http://i0.kym-cdn.com/entries/icons/original/000/019/119/xZjfF2z.jpg'/>
        </div>
    )
}