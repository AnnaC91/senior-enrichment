import axios from 'axios';

//TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT'


//CREATORS
export function getStudents(students) {
    return {
        type: GET_STUDENTS,
        students: students
    }
}

export function getStudent(student) {
    return {
        type: GET_STUDENT,
        student: student
    }
}

export function updateStudent(student) {
    return {
        type: UPDATE_STUDENT,
        student: student
    }
}

//THUNK
export function fetchStudents() {

    return function thunk(dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                const action = getStudents(students);
                dispatch(action);
            });
    };
}

export function postStudent(student, history) {

    return function thunk(dispatch) {
        return axios.post('/api/students', student)
            .then(res => res.data)
            .then(newStudent => {
                dispatch(getStudent(newStudent))
                history.push(`/students/${newStudent.id}`)
            });
    };
}

export function editStudentDetails(student, studentId, history) {

    return function thunk(dispatch) {
        return axios.put(`/api/students/${studentId}`, student)
            .then(res => res.data)
            .then(newStudent => {
                dispatch(updateStudent(newStudent))
                history.push(`/students/${newStudent.id}`)
            });
    };
}

export function transferingStudentCampus(student, studentId, campusId, history) {

    return function thunk(dispatch) {
        return axios.put(`/api/students/${studentId}`, student)
            .then(res => res.data)
            .then(newStudent => {
                dispatch(updateStudent(newStudent))
                history.push(`/campuses/${campusId}`)
            });
    };
}

export function deleteStudent(studentId, history) {
    return function thunk(dispatch) {
        return axios.delete(`/api/students/${studentId}`)
            .then(()=>{
                return axios.get('/api/students')
            })
            .then(res=>res.data)
            .then(students => {
                const action = getStudents(students);
                dispatch(action);
                history.push('/students')
            })
    }
}

//REDUCER
export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_STUDENTS:
            return action.students
        case GET_STUDENT:
            return [...state, action.student];
        case UPDATE_STUDENT:
            return state.map(student => {
                if (student.id === action.student.id) {
                    return action.student
                } else {
                    return student
                }
            })
        default:
            return state;
    }
}
