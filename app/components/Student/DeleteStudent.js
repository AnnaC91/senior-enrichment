import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent } from '../../reducers';

function DeleteStudent(props){
    return(
        <div>
            <p> Are you sure you want to expell {props.student.name}? </p>
            <div>
            <button onClick={props.delete}>Yes</button>
            <button><Link to={`/students/${props.student.id}`}>No</Link></button>
            </div>
        </div>
    )
}

const mapState = function (state, ownProps) {
    const studentId = ownProps.match.params.studentId
    const foundStudent = state.students.find(student => student.id === +studentId) || {campusId: 0}
    return {
        student: foundStudent || {name: '', email: ''},
    };
}

const mapDispatch = function (dispatch, ownProps){
    return {
        delete(){
            const studentId = ownProps.match.params.studentId
            dispatch(deleteStudent(studentId,ownProps.history))
        }
    }
}

export default connect(mapState,mapDispatch)(DeleteStudent)