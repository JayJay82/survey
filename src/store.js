import { createStore, applyMiddleware } from 'redux';
import rootReducer from './app/rootReducer';

export default function configureStore() {
 return createStore(
  rootReducer,
   applyMiddleware()
 );
}