import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCampus } from '../../reducers';

function NewCampus(props){
    return(
        <div>
            <h3>New Campus</h3>
            <form onSubmit={props.submitNewCampus}>
                <div>
                    <label>Enter Name:</label>
                    <input
                        name='name'
                        type='text'
                        required
                    />
                </div>
                <div>
                    <label>Enter ImageURL:</label>
                    <small>(We don't host image files!)</small>
                    <input
                        name='url'
                        type='text'
                    />
                </div>
                <button type='submit'>{props.buttonText}</button>
            </form>
        </div>
    )
}

const mapState = function (state) {
    return {
        buttonText: 'Create New Campus',
    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        submitNewCampus(event) {
            event.preventDefault();
            const newCampusDetails = {
                name: event.target.name.value,
                image: event.target.url.value,
            }
            dispatch(postCampus(newCampusDetails,ownProps.history))
        }
    }
}

export default connect(mapState, mapDispatch)(NewCampus)