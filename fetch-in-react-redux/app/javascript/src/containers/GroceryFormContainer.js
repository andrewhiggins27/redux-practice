import React, { Component } from 'react'
import { connect } from 'react-redux'

import { clearForm, handleNameChange, postGrocery } from '../modules/groceries'

import GroceryInputField from '../components/GroceryInputField'

class GroceryFormContainer extends Component {
  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(event) {
    event.preventDefault()

    const newGroceryData = {
      grocery: {
        name: this.props.name
      }
    }

    this.props.postGrocery(newGroceryData)
    this.props.clearForm()
  }

  render() {
    return(
      <form onSubmit={this.handleFormSubmit}>
        <GroceryInputField
          handleChange={this.props.handleNameChange}
          name={this.props.name}
        />
        <input type="submit" value="Add To List" />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.groceries.name,
    groceryList: state.groceries.groceryList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postGrocery: (groceryData) => dispatch(postGrocery(groceryData)),
    handleNameChange: (event) => dispatch(handleNameChange(event)),
    clearForm: () => dispatch(clearForm())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroceryFormContainer)
