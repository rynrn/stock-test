import _ from 'lodash';
import { STOCK_LOADED, STOCK_FAILD, LOADING_STOCK, CHANGE_DATA_TYPE } from '../constants/actionTypes';

const initState = {
	isFetching: false,
	didInvalidate: false,
  stock: {},
	dataType: "Close"
};

export default (state = initState, action) => {
  switch (action.type) {
    case STOCK_FAILD:
      return _.assign({}, state, {
				isFetching: false,
        didInvalidate: true,
        error: action.error
      });
    case LOADING_STOCK:
      return _.assign({}, state, {
        isFetching: true,
				stock: {},
      });
    case STOCK_LOADED:
      return _.assign({}, state, {
        isFetching: false,
        stock: action.payload
      });
		case CHANGE_DATA_TYPE:
			return _.assign({}, state, {
				dataType: action.dataType
			});
    default:
      return state;
  }
};
