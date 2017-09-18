import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { bindActionCreators, dispatch } from 'redux';
import { connect } from 'react-redux';
import * as StockActions from '../actions/stock';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import Highlight from 'react-highlight';
import Header from '../components/Header';
import { browserHistory } from 'react-router';
import stockList from '../constants/stockList';

const mapByType = (dataset_data, dataType) => {
  const index = dataset_data.column_names.indexOf(dataType);
  return _.map(dataset_data.data, stock => {
    return [new Date(stock[0]).getTime(), stock[index]];
  });
};

class Stock extends React.Component {
  constructor() {
    super();
    this.state = {
      currentStock: null
    }
    this.changeStock = this.changeStock.bind(this);
  }

  loadStock(stockId) {
    const { stockActions, params } = this.props;
    this.setState({ currentStock: stockId });
    stockActions.getStockData(stockId);
  }

  changeStock(event) {
    browserHistory.push(`/stock/${event.target.value}`);
    this.loadStock(event.target.value);
  }

  componentWillMount() {
    const { params } = this.props;
    this.loadStock(params.stockId);
  }

  renderLoader() {
    return <div>Loading</div>;
  }

  renderError(errorMsg) {
    return <div>Error: {errorMsg}</div>;
  }

  renderCharts() {
    const { isFetching, didInvalidate, error, stock, dataType } = this.props.stock;
    if (!stock.dataset_data) {
      return <span></span>
    }

    var config = {
      rangeSelector: {
        selected: 1
      },
      series: [{
        name: this.props.params.stockId,
        data: mapByType(stock.dataset_data, dataType),
        tooltip: {
          valueDecimals: 2
        }
      }]
    };

    return (
      <div>
        <div className="stock-name">{this.props.params.stockId}</div>
        <select className="change-stock" onChange={this.changeStock} value={this.state.currentStock}>
          {_.map(stockList, (s, i) => <option key={i} value={s}>{s}</option>)}
        </select>
        <ReactHighstock config={config}></ReactHighstock>
      </div>
    );
  }

  render() {
    const { isFetching, didInvalidate, error, stock } = this.props.stock;
    return (
      <div>
        <Header {...this.props}/>
        {isFetching && this.renderLoader()}
        {didInvalidate && this.renderError(error)}
        {!_.isEmpty(stock) && this.renderCharts()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return state
};

const mapDispatchToProps = (dispatch) => {
	return {
		stockActions: bindActionCreators(StockActions, dispatch)
	}
};

export default connect(
  mapStateToProps,
	mapDispatchToProps
)(Stock);
