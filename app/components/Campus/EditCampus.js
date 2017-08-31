import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editCampusDetails, transferingStudentCampus } from '../../reducers';

function EditCampus(props) {
    console.log('edit campus props: ', props)
    return (
        <div>
            <h2>Edit {props.campus.name}'s Details:</h2>
            <Link to={`/campuses/${props.campus.id}`}>return to {props.campus.name}</Link>

            {/* CHANGE NAME HERE */}
            <div>
                <h4>Current Name:</h4>
                <p>{props.campus.name}</p>
                <form onSubmit={props.submitNewCampusName}>
                    <label>New Name:</label>
                    <input
                        name='name'
                        type='text'
                    />
                    <button type='submit'>{props.buttonText}</button>
                </form>
            </div>

            {/* CHANGE IMAGE URL HERE */}
            <div>
                <h4>Current Image:</h4>
                <img src={props.campus.image} />
                <form onSubmit={props.submitNewCampusImage}>
                    <label>New Image Url:</label>
                    <small>(We don't host image files!)</small>
                    <input
                        name='url'
                        type='text'
                    />
                    <button type='submit'>{props.buttonText}</button>
                </form>
            </div>

            {/* MANAGE STUDENTS HERE */}
            <div>
                <h4>Manage Students:</h4>

                {/* TRANSFER IN STUDENT TO THIS CAMPUS HERE */}
                <form onSubmit={props.submitStudentAdd}>
                    <label>Select Student to Add:</label>
                    <select name='transferIn'>
                        {props.otherstudents.map(student => {
                            return(
                                <option key={student.id} value={student.id}>{student.name}</option>
                            )
                        })}
                    </select>
                    <button type='submit'>Add</button>
                </form>

                {/* TRANSFER OUT STUDENT FROM THIS CAMPUS HERE */}
                <form onSubmit={props.submitStudentRemove}>
                    <label>Select Student to Remove:</label>
                    <select name='studentToTransferOut'>
                        {props.students.map(student => {
                            return(
                                <option key={student.id} value={student.id}>{student.name}</option>
                            )
                        })}
                    </select>
                    <select name='transferOutTo'>
                        {props.othercampuses.map(campus => {
                            return(
                                <option key={campus.id} value={campus.id}>{campus.name}</option>
                            )
                        })}
                    </select>
                    <button type='submit'>Remove</button>
                </form>
            </div>
        </div>
    )
}

const mapState = function (state, ownProps) {
    const campusId = ownProps.match.params.campusId
    return {
        campus: state.campuses.find(campus => campus.id === +campusId) || { name: '', image: '' },
        students: state.students.filter(student => student.campusId === +campusId),
        otherstudents: state.students.filter(student => student.campusId !== +campusId),
        othercampuses: state.campuses.filter(campus => campus.id !== +campusId),
        buttonText: 'Edit'
    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        // to change campus name
        submitNewCampusName(event) {
            event.preventDefault();
            const newCampusDetails = {
                name: event.target.name.value,
            }
            dispatch(editCampusDetails(newCampusDetails, ownProps.match.params.campusId, ownProps.history))
        },

        // to change campus image
        submitNewCampusImage(event) {
            event.preventDefault();
            const newCampusDetails = {
                image: event.target.url.value,
            }
            dispatch(editCampusDetails(newCampusDetails, ownProps.match.params.campusId, ownProps.history))
        },

        // to transfer in a student
        submitStudentAdd(event){
            event.preventDefault();
            const eventDetails = {
                studentId: event.target.transferIn.value, //student to transfer
                campusId: ownProps.match.params.campusId //the current campus
            }
            const newStudentDetails = {
                campusId: eventDetails.campusId
            }

            dispatch(transferingStudentCampus(newStudentDetails, eventDetails.studentId, ownProps.match.params.campusId, ownProps.history))
        },

        // transfer out a student
        submitStudentRemove(event){
            event.preventDefault();
            const eventDetails = {
                studentId: event.target.studentToTransferOut.value, //student to transfer
                campusId: event.target.transferOutTo.value //campus other than current
            }
            const newStudentDetails = {
                campusId: eventDetails.campusId
            }
            dispatch(transferingStudentCampus(newStudentDetails, eventDetails.studentId, ownProps.match.params.campusId, ownProps.history))
        }
    }
}

export default connect(mapState, mapDispatch)(EditCampus)