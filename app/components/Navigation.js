import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navigation extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <ul>
                    <li><Link to={'/campuses'}>Campuses</Link></li>
                    <li><Link to={'/students'}>Students</Link></li>
                </ul>

            </div>
        );
    }
}