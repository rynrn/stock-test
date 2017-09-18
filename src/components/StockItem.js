import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class StockItem extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    browserHistory.push(`/stock/${this.props.name}`);
  }

  render() {
    const { name, item } = this.props;
    if (_.size(item.dataset_data.data) > 0 && _.size(item.dataset_data.data[0]) > 0) {
      return (
        <div className="stock-item" onClick={this.handleClick}>
          <div className="name">{item.name}</div>
          <div className="value">{item.dataset_data.data[0][4].toString()}</div>
        </div>
      );
    }
    else {
      return false
    }
  }
}

export default StockItem;
