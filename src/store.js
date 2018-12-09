import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import rootReducer from './app/rootReducer';
import { watcherSaga } from "./app/survey/sagas/survey.sagas";



export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  const store =  createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(watcherSaga);
  return store;
}