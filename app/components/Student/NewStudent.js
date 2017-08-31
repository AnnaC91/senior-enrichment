import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStudent } from '../../reducers';

function NewStudent(props) {
    return (
        <div>
            <h3>New Student</h3>
            <form onSubmit={props.submitNewStudent}>
                <div>
                    <label>Enter Name:</label>
                    <input
                        name='name'
                        type='text'
                    />
                </div>
                <div>
                    <label>Enter Email:</label>
                    <input
                        name='email'
                        type='text'
                    />
                </div>
                <div>
                    <label>Choose Campus</label>
                    <select name='campus'>
                        {props.campuses.map(campus=>{
                            return(
                                <option key={campus.id} value={campus.id}>{campus.name}</option>
                            )
                        })}
                    </select>
                </div>
                <button type='submit'>{props.buttonText}</button>
            </form>
        </div>
    )

}

const mapState = function (state) {
    return {
        buttonText: 'Create New Student',
        campuses: state.campuses
    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        submitNewStudent(event) {
            event.preventDefault();
            const newStudentDetails = {
                name: event.target.name.value,
                email: event.target.email.value,
                campusId: event.target.campus.value
            }
            dispatch(postStudent(newStudentDetails,ownProps.history))
        }
    }
}

export default connect(mapState,mapDispatch)(NewStudent)