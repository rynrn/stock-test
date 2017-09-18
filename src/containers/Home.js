import React, { Component } from 'react';
import { bindActionCreators, dispatch } from 'redux';
import { connect } from 'react-redux';
import * as StocksActions from '../actions/stocks';
import Header from '../components/Header';
import StockGrid from '../components/StockGrid';


class Home extends Component {
  componentWillMount() {
    const { stocksActions } = this.props;
    stocksActions.fetchStocks();
  }

  renderLoader() {
    return <div>Loading</div>;
  }

  renderError(errorMsg) {
    return <div>Error: {errorMsg}</div>;
  }

  render() {
    const { isFetching, didInvalidate, error, stocks } = this.props.stocks;
    return (
      <div>
        <Header {...this.props}/>
        {isFetching && this.renderLoader()}
        {didInvalidate && this.renderError(error)}
        {_.size(stocks) > 0 && <StockGrid items={stocks} {...this.props}/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		stocksActions: bindActionCreators(StocksActions, dispatch)
	}
};

export default connect(
  mapStateToProps,
	mapDispatchToProps
)(Home);
