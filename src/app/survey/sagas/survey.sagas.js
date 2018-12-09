

import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

export const GET_SURVEY_REQUEST = "GET_SURVEY_REQUEST";
export const GET_SURVEY_SUCCESS = "GET_SURVEY_SUCCESS";
export const GET_SURVEY_ERROR = "GET_SURVEY_ERROR";
// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(GET_SURVEY_REQUEST, workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchSurvey() {
  return axios({
    method: "get",
    url: "http://localhost:4000/package"
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const response = yield call(fetchSurvey);
    const survey = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: GET_SURVEY_SUCCESS, payload: survey });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: GET_SURVEY_ERROR, error : error });
  }
}