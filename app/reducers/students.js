import axios from 'axios';

//TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';

//CREATORS
export function getStudents(students){
    return {
        type: GET_STUDENTS,
        students: students
    }
}

export function getStudent(student){
    return {
        type: GET_STUDENTS,
        student: student
    }
}


//THUNK
export function fetchStudents () {

  return function thunk (dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  };
}

export function postStudents (student) {

  return function thunk (dispatch) {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(newStudent => {
        dispatch(getStudent(newStudent))
      });
  };
}

//REDUCER
export default function reducer(state = [], action){
    switch(action.type){
        case GET_STUDENTS:
            return action.students
        case GET_STUDENT:
            return [...state, action.student];
        default: 
            return state;
    }
}
