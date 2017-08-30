
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //not sure if i'll need these yet
import { connect } from 'react-redux';
import { withRouter } from 'react-router'; //^*


//All students component
function Students (props){
    console.log('student props :',props.students)
    return(
        <div>
            <Link to={`/new-student`}>New Student</Link>
            {/* map out students */}
            {props.students.map(student => {
                return (
                    <div key={student.id}>
                        <Link to={`/students/${student.id}`}>
                        <h3>{student.name}</h3>
                        <p>{student.email}</p>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

//Mapping state to props
const mapState = function (state) {
    return {
        students: state.students

    };
}

export default connect(mapState)(Students)