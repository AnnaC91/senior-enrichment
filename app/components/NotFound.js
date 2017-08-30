import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

export default function Campuses (){
    return(
        <div>
            <h1>Error 404!</h1>
            <p>Not sure how you got here but here is how you can go back <Link to='/'>home</Link>!</p>
        </div>
    )
}