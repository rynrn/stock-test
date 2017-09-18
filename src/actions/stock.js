import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import {
	STOCK_LOADED,
	STOCK_FAILD,
	LOADING_STOCK,
	CHANGE_DATA_TYPE
} from '../constants/actionTypes';

const successLoadStock = (payload) => {
	return {
		type: STOCK_LOADED,
    payload
	}
};
const faildLoadStock = (error) => {
	return {
		type: STOCK_FAILD,
    error: error.statusText
	}
};
const loadingStock = () => {
	return {
		type: LOADING_STOCK
	}
};
export const getStockData = (stockId) => {
  return function (dispatch) {
    dispatch(loadingStock());
    axios.get(`/api/v3/datasets/WIKI/${stockId}/data.json?api_key=zM_THsrdLscp6oD-esh8&order=asc`)
			.then(res => {
				dispatch(successLoadStock(res.data));
			}).catch(err => {
				dispatch(successLoadStock(err));
			});
	}
};

export const changeDataType = (dataType) => {
	return {
		type: CHANGE_DATA_TYPE,
		dataType
	}
}
