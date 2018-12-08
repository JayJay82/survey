import { GET_SURVEY } from '../actions/survey.actions';
export default (state =  {}, action) => {
    switch(action.type) {
        case GET_SURVEY : 
            return { ...state , result : action.payload }
        default:
            return state    
    }
}