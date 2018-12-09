import { combineReducers } from 'redux';
import surveyReducer from './survey/reducers/survey.reducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    survey : surveyReducer,
    form : formReducer
});