import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Campus component
function Campus(props){
    return(
        <div>
            <h2>{props.campus.name}</h2> 
            <img src={props.campus.image}/>
            <h3>Students at {props.campus.name}:</h3>
            <ul>
                {props.students.map(student=>{
                    return (
                        <li key={student.id}>
                            <div>
                                <Link to={`/students/${student.id}`}>
                                <h4>{student.name}</h4>
                                <p>{student.email}</p>
                                </Link>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <button><Link to={`/campuses/${props.campus.id}/edit`}>edit</Link></button>
            <button><Link to={`/campuses/${props.campus.id}/delete`}>delete</Link></button>
            
        </div>
    )
}

//Mapping state to props
const mapState = function (state, ownProps) {
    const campusId = ownProps.match.params.campusId
    return {
        campus: state.campuses.find(campus => campus.id=== +campusId) || {name: '', image: ''},
        students: state.students.filter(student => student.campusId=== +campusId) 
    };
}

export default connect(mapState)(Campus)