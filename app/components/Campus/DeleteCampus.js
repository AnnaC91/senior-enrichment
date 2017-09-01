import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus } from '../../reducers';

function DeleteCampus(props) {
    console.log('checking delete page\'s student count :',props.students.length, 'student array :', props.students)
    return (
        <div>

            {/* TERNARY TO NOT ALLOW DELETION IF THERE ARE STILL STUDENTS AT THIS CAMPUS */}
            {(props.students.length>0) ? <div>
                <p>There are still students enrolled here. Please transfer them out or expell them first!</p>
                <button><Link to={`/campuses/${props.campus.id}`}>Back</Link></button>
            </div>
            : <div>
                <p> Are you sure you want to demolish {props.campus.name}? </p>
                <div >
                    <button onClick={props.delete}>Yes</button>
                    <button><Link to={`/campuses/${props.campus.id}`}>No</Link></button>
                </div>
            </div>}
        </div>
    )
}

const mapState = function (state, ownProps) {
    const campusId = ownProps.match.params.campusId
    return {
        campus: state.campuses.find(campus => campus.id === +campusId) || { name: '', image: '' },
        students: state.students.filter(student => student.campusId === +campusId)
    }
}

const mapDispatch = function (dispatch,ownProps) {
    return {
        delete() {
            const campusId = ownProps.match.params.campusId
            dispatch(deleteCampus(campusId,ownProps.history))
        }
    }
}

export default connect(mapState, mapDispatch)(DeleteCampus)