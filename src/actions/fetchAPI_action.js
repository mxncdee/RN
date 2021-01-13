import {API_KEY} from '../../config';
import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const fetchCategorySuccess = (data,category) => {
	let res={
		type: FETCH_CATEGORY_SUCCESS,
		categoryData: {
			category:category,
			data:data
		}
	}
	return res;
};

export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS';
export const fetchSearchSuccess = (data) => {
	let res={
		type: FETCH_SEARCH_SUCCESS,
		searchData: {
			count:data.totalResults,
			data:data.articles
		}
	}
	return res;
};

export const FETCH_ERROR = 'FETCH_ERROR';
export const fetchError = error => ({
	type: FETCH_ERROR,
	error
});

export const fetchCategory = (category) => async (dispatch,getState) => {
	const endpoint = `${API_BASE_URL}?apiKey=${API_KEY}&category=${category}&country=it`;
	try {
		let response = await fetch(endpoint);
		let normalizedRes = await normalizeResponseErrors(response);
		let responseJson = await normalizedRes.json();
		let responseArticles = responseJson.articles;
		let returnData = fetchCategorySuccess(responseArticles,category);
		return dispatch(returnData);
	} catch (error) {
		dispatch(fetchError(error));
	}
};

export const fetchSearch = (searchText) => async (dispatch,getState) => {
	const endpoint=`${API_BASE_URL}?apiKey=${API_KEY}&country=it&q=${searchText}`;
	try {
		let response = await fetch(endpoint);
		let normalizedRes = await normalizeResponseErrors(response);
		let responseJson = await normalizedRes.json();
		let returnData = fetchSearchSuccess(responseJson);
		return dispatch(returnData);
	} catch (error) {
		dispatch(fetchError(error));
	}

};