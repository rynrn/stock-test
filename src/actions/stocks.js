import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import stockList from '../constants/stockList';
import {
	STOCKS_LOADED,
	STOCKS_FAILD,
	LOADING_STOCKS
} from '../constants/actionTypes';

const successLoadStocks = (payload) => {
	return {
		type: STOCKS_LOADED,
    payload,
		stockList
	}
};

const faildLoadStocks = (error) => {
	return {
		type: STOCKS_FAILD,
    error: error.statusText
	}
};

const loadingStocks = () => {
	return {
		type: LOADING_STOCKS
	}
};

export const fetchStocks = () => {
  return function (dispatch) {
    dispatch(loadingStocks());
		const items = _.map(stockList, stockId => axios.get(
			`/api/v3/datasets/WIKI/${stockId}/data.json?api_key=zM_THsrdLscp6oD-esh8&limit=1`
		));
		var isSucceeded = false;
    Promise.all(items).then(values => {
			isSucceeded = true;
      dispatch(successLoadStocks(_.map(values, val => val.data)));
    }).catch(reason => {
			if (!isSucceeded)
      	dispatch(faildLoadStocks(reason));
    });
	}
};
