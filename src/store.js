import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import fetchAPI_reducer from './reducers/fetchAPI_reducer';

const store=createStore(
	fetchAPI_reducer,
	applyMiddleware(thunkMiddleware)
);

export default store;