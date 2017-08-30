import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Campus(props){
    console.log('campus props: ',props)
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
        </div>
    )
}

const mapState = function (state, ownProps) {
    const campusId = ownProps.match.params.campusId
    console.log('checking students access from campus :',state.students)
    return {
        campus: state.campuses.find(campus => campus.id=== +campusId) || {name: '', image: ''},
        students: state.students.filter(student => student.campusId=== +campusId) 
    };
}

export default connect(mapState)(Campus)