import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Student component
function Student(props){
    console.log('student props: ',props)
    return(
        <div>
            <h3>{props.student.name}</h3> 
            <p>{props.student.email}</p>
            <p>This student is a member of the <Link to={`/campuses/${props.campus.id}`}>{props.campus.name}</Link> campus.</p>
            <Link to={`/students/${props.student.id}/edit`}>edit</Link>
        </div>
    )
}

//Mapping state to props
const mapState = function (state, ownProps) {
    const studentId = ownProps.match.params.studentId
    const foundStudent = state.students.find(student => student.id === +studentId) || {campusId: 0}
    return {
        student: foundStudent || {name: '', email: ''},
        campus: state.campuses.find(campus => campus.id === foundStudent.campusId) || {name: 'No Campus', id: 0}
    };
}

export default connect(mapState)(Student)