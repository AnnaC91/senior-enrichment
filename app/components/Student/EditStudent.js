import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editStudentDetails } from '../../reducers';

function EditStudent(props) {
    return (
        <div>
            <h2>Edit {props.student.name}'s Details:</h2>
            <Link to={`/campuses/${props.student.id}`}>return to {props.student.name}</Link>

            {/* CHANGE NAME HERE */}
            <div>
                <h4>Current Name:</h4>
                <p>{props.student.name}</p>
                <form onSubmit={props.submitNewStudentName}>
                    <label>New Name:</label>
                    <input
                        name='name'
                        type='text'
                    />
                    <button type='submit'>{props.buttonText}</button>
                </form>
            </div>

            {/* CHANGE EMAIL HERE */}
            <div>
                <h4>Current Email:</h4>
                <p>{props.student.email}</p>
                <form onSubmit={props.submitNewStudentEmail}>
                    <label>New Email:</label>
                    <input
                        name='email'
                        type='text'
                    />
                    <button type='submit'>{props.buttonText}</button>
                </form>
            </div>

            {/* CHANGE STUDENT'S CAMPUS HERE */}
            <div>
                <h4>Current Campus:</h4>
                <p>{props.campus.name}</p>
                <label>Select New Campus:</label>
                <form onSubmit={props.submitNewStudentCampus}>
                    <select name='campus'>
                        {props.campuses.map(campus => {
                            return (
                                <option key={campus.id} value={campus.id}>{campus.name}</option>
                            )
                        })}
                    </select>
                    <button type='submit'>{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}

const mapState = function (state, ownProps) {
    const studentId = ownProps.match.params.studentId;
    const foundStudent = state.students.find(student => student.id === +studentId) || { campusId: 0 }
    return {
        student: foundStudent || { name: '', email: '' },
        campus: state.campuses.find(campus => campus.id === foundStudent.campusId) || { name: 'No Campus', id: 0 },
        campuses: state.campuses,
        buttonText: 'Edit'
    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        // to change student's name
        submitNewStudentName(event) {
            event.preventDefault();
            const newStudentDetails = {
                name: event.target.name.value,
            }
            dispatch(editStudentDetails(newStudentDetails, ownProps.match.params.studentId, ownProps.history))
        },

        // to change student's email
        submitNewStudentEmail(event) {
            event.preventDefault();
            const newStudentDetails = {
                email: event.target.email.value,
            }
            dispatch(editStudentDetails(newStudentDetails, ownProps.match.params.studentId, ownProps.history))
        },

        // to change student's email
        submitNewStudentCampus(event) {
            event.preventDefault();
            const newStudentDetails = {
                campusId: event.target.campus.value
            }
            dispatch(editStudentDetails(newStudentDetails, ownProps.match.params.studentId, ownProps.history))
        }
    }
}

export default connect(mapState, mapDispatch)(EditStudent)