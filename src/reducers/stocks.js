import _ from 'lodash';
import { STOCKS_LOADED, STOCKS_FAILD, LOADING_STOCKS } from '../constants/actionTypes';

const initState = {
	isFetching: false,
	didInvalidate: false,
  stocks: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case STOCKS_FAILD:
      return _.assign({}, state, {
				isFetching: false,
        didInvalidate: true,
        error: action.error
      });
    case LOADING_STOCKS:
      return _.assign({}, state, {
        isFetching: true
      });
    case STOCKS_LOADED:
      return _.assign({}, state, {
        isFetching: false,
        stocks: _.map(action.payload, (item, i) => {
					return _.assign(item, {
						name: action.stockList[i]
					})
				})
      });
    default:
      return state;
  }
};
