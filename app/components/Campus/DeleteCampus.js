import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editCampusDetails, transferingStudentCampus } from '../../reducers';

function DeleteCampus(props) {
    console.log('checking delete page\'s student count :',props.students.length, 'student array :', props.students)
    return (
        <div>

            {/* TERNARY TO NOT ALLOW DELETION IF THERE ARE STILL STUDENTS AT THIS CAMPUS */}
            {(props.students.length>0) ? <div>
                <p>There are still students enrolled here. Please transfer them out or expell them first!</p>
            </div>
            : <div>
                <p> Are you sure you want to close down {props.campus.name}? </p>
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

const mapDispatch = function (dispatch) {
    return {
        delete() {
            alert('attempted to delete campus')
        }
    }
}

export default connect(mapState, mapDispatch)(DeleteCampus)