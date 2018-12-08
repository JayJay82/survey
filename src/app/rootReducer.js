import { combineReducers } from 'redux';
import surveyReducer from './survey/reducers/survey.reducer';

export default combineReducers({
    survey : surveyReducer
});