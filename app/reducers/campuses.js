import axios from 'axios';

//TYPES
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'
const UPDATE_CAMPUSES = 'UPDATE_CAMPUSES'

//CREATORS
export function getCampuses(campuses){
    return {
        type: GET_CAMPUSES,
        campuses: campuses
    }
}

export function getCampus(campus){
    return {
        type: GET_CAMPUS,
        campus: campus
    }
}

export function updateCampus(campus){
    return {
        type: UPDATE_CAMPUS,
        campus: campus
    }
}

export function updateCampuses(campusId){
    return {
        type: UPDATE_CAMPUSES,
        campusId: campusId
    }
}

//THUNK
export function fetchCampuses () {

  return function thunk (dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  };
}

export function postCampus (campus, history) {

  return function thunk (dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        dispatch(getCampus(newCampus))
        history.push(`/campuses/${newCampus.id}`)
      });
  };
}

export function editCampusDetails (campus, campusId, history) {

  return function thunk (dispatch) {
    return axios.put(`/api/campuses/${campusId}`, campus)
      .then(res => res.data)
      .then(newCampus => {
        dispatch(updateCampus(newCampus))
        history.push(`/campuses/${newCampus.id}`)
      });
  };
}

export function deleteCampus(campusId, history) {
    return function thunk(dispatch) {
        return axios.delete(`/api/campuses/${campusId}`)
            .then(()=>{
                dispatch(updateCampuses(campusId));
                history.push('/campuses')
            })
            
    }
}

//REDUCER
export default function reducer(state = [], action){
    switch(action.type){
        case GET_CAMPUSES:
            return action.campuses
        case GET_CAMPUS:
            return [...state, action.campus];
        case UPDATE_CAMPUS:
            return state.map(campus => {
                if (campus.id === action.campus.id){
                    return action.campus
                } else {
                    return campus
                }
            })
        case UPDATE_CAMPUSES:
            return state.filter(campus => campus.id !== +action.campusId)
        default: 
            return state;
    }
}
