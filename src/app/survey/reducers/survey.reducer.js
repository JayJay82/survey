import { GET_SURVEY } from '../actions/survey.actions';
import { GET_SURVEY_ERROR , GET_SURVEY_REQUEST , GET_SURVEY_SUCCESS} from '../sagas/survey.sagas';
export default (state =  {}, action) => {
    switch(action.type) {
        case GET_SURVEY_REQUEST : 
          return { ...state, fetching : true, error: null};
        case GET_SURVEY_SUCCESS :
          return {...state , fetching : false, result : action.payload};
        case GET_SURVEY_ERROR:
          return {...state, fetching :false, result : null, error : action.error};
        case GET_SURVEY : 
            return { ...state , result : action.payload };
        default:
            return state    
    }
}