import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import StockItem from './StockItem';


class StockGrid extends Component {
  render() {
    return (
      <div className="stock-grid">
        {_.map(this.props.items, (item, i) => {
          return <StockItem {...this.props} key={i.toString()} name={item.name} item={item} />;
        })}
      </div>
    );
  }
}

StockGrid.propTypes = {
  items: PropTypes.array
};

export default StockGrid;
