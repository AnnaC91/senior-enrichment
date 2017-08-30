
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router'; //^*

//All campuses component
function Campuses(props) {
    return (
        <div>
            <Link to={`/new-campus`}>New Campus</Link>
            {/* map out campuses */}
            {props.campuses.map(campus => {
                return (
                    <div key={campus.id}>
                        <Link to={`/campuses/${campus.id}`}>
                        <h3>{campus.name}</h3>
                        <img src={campus.image} />
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

//Mapping state to props
const mapState = function (state) {
    return {
        campuses: state.campuses
    };
}

export default connect(mapState)(Campuses)