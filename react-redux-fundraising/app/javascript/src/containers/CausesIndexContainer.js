import React, { Component } from 'react';
import { connect } from 'react-redux';

import CauseTile from '../components/CauseTile';
import { getCauses, causeSelected } from '../modules/causes';

class CausesIndexContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCauses()
  }

  render() {
    const causeList = this.props.causeList

    const causeTiles = causeList.map(cause => {
      const handleSelect = () => {
        this.props.causeSelected(cause.id)
      }

      return(
        <CauseTile
          key={cause.id}
          id={cause.id}
          name={cause.name}
          handleSelect={handleSelect}
        />
      )
    })

    return(
      <div>
        <h1>Existing Causes</h1>
        {causeTiles}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    causeList: state.causes.causeList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCauses: () => dispatch(getCauses()),
    causeSelected: (causeId) => dispatch(causeSelected(causeId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CausesIndexContainer);
