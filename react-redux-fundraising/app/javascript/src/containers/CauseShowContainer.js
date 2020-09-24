import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewDonationFormContainer from './NewDonationFormContainer';
import DonationTile from '../components/DonationTile';
import AlertMessage from '../components/AlertMessage'
import { getDonations } from '../modules/donations';

class CauseShowContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getDonations(this.props.cause.id)
  }

  componentDidUpdate() {
    this.props.getDonations(this.props.cause.id)
  }

  render() {
    const donationTiles = this.props.donationList.map(donation => {
      return(
        <DonationTile
          key={donation.id}
          name={donation.name}
          comment={donation.comment}
          amount={donation.amount}
        />
      )
    })

    let alertMessage
    if (this.props.message !== '') {
      alertMessage = <AlertMessage message={this.props.message}/>
    }

    return (
      <div>
        <hr />
        <h2>{this.props.cause.name}</h2>
        <h4>{this.props.cause.description}</h4>
        {donationTiles}
        {alertMessage}
        <NewDonationFormContainer />
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    donationList: state.donations.donationList,
    message: state.alertMessage.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDonations: (causeId) => dispatch(getDonations(causeId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CauseShowContainer);
