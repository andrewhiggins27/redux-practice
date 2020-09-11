import React, { Component } from 'react';
import { connect } from 'react-redux';

import InputField from '../components/InputField'
import { addNewDonut, handleChange, clearForm } from '../modules/donuts';

class NewDonutOrderFormContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  calculateNewId() {
    if (this.props.donutOrderList.length === 0) {
      return 1
    } else {
      const donutIds = this.props.donutOrderList.map(donut => donut.id)
      return Math.max(...donutIds) + 1
    }
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const newId = this.calculateNewId()
    const newDonut = {
      id: newId,
      name: this.props.newName,
      flavor: this.props.newFlavor
    }
    this.props.addNewDonut(newDonut)
    this.props.clearForm()
  }

  render() {
    return (
      <div className='small-6 columns'>
        <h1>Add a New Donut Order</h1>
        <form onSubmit={this.handleFormSubmit}>
          <InputField
            key='newName'
            label='Your Name'
            type='text'
            name='newName'
            value={this.props.newName}
            handleChange={this.props.handleChange}
          />
          <InputField
            key='newFlavor'
            label='Flavor'
            type='text'
            name='newFlavor'
            value={this.props.newFlavor}
            handleChange={this.props.handleChange}
          />
          <input type='submit' />
        </form>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    donutOrderList: state.donuts.donutOrderList,
    newName: state.donuts.newName,
    newFlavor: state.donuts.newFlavor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewDonut: (donut) => dispatch(addNewDonut(donut)),
    handleChange: (event) => dispatch(handleChange(event)),
    clearForm: () => dispatch(clearForm())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDonutOrderFormContainer);
