import React, { Component } from 'react';
import { connect } from 'react-redux';

import DonutOrdersList from '../components/DonutOrdersList'
import NewDonutOrderFormContainer from './NewDonutOrderFormContainer'

class DonutOrdersIndexContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='row donut-list'>
        <DonutOrdersList
          donutOrderList={this.props.donutOrderList}
        />
        <NewDonutOrderFormContainer />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    donutOrderList: state.donuts.donutOrderList
  }
}

export default connect(mapStateToProps, null)(DonutOrdersIndexContainer);
