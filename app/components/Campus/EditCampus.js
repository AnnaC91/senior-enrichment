import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editCampusDetails } from '../../reducers';

function EditCampus(props) {
    return (
        <div>
            <h2>Edit {props.campus.name}'s Details:</h2>
            <Link to={`/campuses/${props.campus.id}`}>return to {props.campus.name}</Link>
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

            <div>
                <h4>Current Image:</h4>
                <img src={props.campus.image} />
                <p>New Details: </p>
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
        </div>
    )
}

const mapState = function (state, ownProps) {
    const campusId = ownProps.match.params.campusId
    return {
        campus: state.campuses.find(campus => campus.id === +campusId) || { name: '', image: '' },
        buttonText: 'Edit'
    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        submitNewCampusName(event) {
            event.preventDefault();
            const newCampusDetails = {
                name: event.target.name.value,
            }
            dispatch(editCampusDetails(newCampusDetails, ownProps.match.params.campusId, ownProps.history))
        },
        submitNewCampusImage(event) {
            event.preventDefault();
            const newCampusDetails = {
                image: event.target.url.value,
            }
            dispatch(editCampusDetails(newCampusDetails, ownProps.match.params.campusId, ownProps.history))
        }
    }
}

export default connect(mapState, mapDispatch)(EditCampus)