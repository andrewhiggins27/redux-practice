import React, { Component } from 'react';
import { connect } from 'react-redux';

import InputField from '../components/InputField'
import { postDonation, handleFieldChange } from '../modules/donations'

class NewDonationFormContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(event) {
    event.preventDefault()

    const newDonation = {
      name: this.props.newName,
      comment: this.props.newComment,
      amount: this.props.newAmount
    }
    this.props.postDonation(newDonation, this.props.selectedCauseId)
  }

  render() {
    return (
      <form className='columns small-10 medium-6' onSubmit={this.handleFormSubmit}>
        <h3> Add a New Donation </h3>
        <InputField
          key='newName'
          label='Your Name'
          type='text'
          name='newName'
          value={this.props.newName}
          handleChange={this.props.handleFieldChange}
        />
        <InputField
          key='newComment'
          label='Comment'
          type='text'
          name='newComment'
          value={this.props.newComment}
          handleChange={this.props.handleFieldChange}
        />
        <InputField
          key='newAmount'
          label='Amount'
          type='number'
          name='newAmount'
          value={this.props.newAmount}
          handleChange={this.props.handleFieldChange}
        />
        <input type='submit' />
      </form>
    )
  }
};

const mapStateToProps = state => {
  return {
    newName: state.donations.newName,
    newComment: state.donations.newComment,
    newAmount: state.donations.newAmount,
    selectedCauseId: state.causes.selectedCauseId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postDonation: (donation, selectedCauseId) => { dispatch(postDonation(donation, selectedCauseId)) },
    handleFieldChange: (event) => { dispatch(handleFieldChange(event)) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDonationFormContainer);
