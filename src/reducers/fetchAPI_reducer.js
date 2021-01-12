import {FETCH_CATEGORY_SUCCESS, FETCH_SEARCH_SUCCESS, FETCH_ERROR} from '../actions/fetchAPI_action';

const initialState = {
	error:null,
	categoryData:{
		category:null,
		data:[]
	}
};

export default function reducer(state=initialState,action){
	if(action.type===FETCH_CATEGORY_SUCCESS){
		return Object.assign({},state,{
			error:null,
			categoryData:action.categoryData
		});
	}
	else if(action.type===FETCH_ERROR){
		return Object.assign({},state,{
			error:action.error
		});
	}
	else if(action.type===FETCH_SEARCH_SUCCESS){
		return Object.assign({},state,{
			error:null,
			searchData:action.searchData
		})
	}
	return state;
}