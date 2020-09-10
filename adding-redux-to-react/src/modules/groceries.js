const initialState = {
  groceryList: [],
  name: ''
}

const groceries = (state = initialState, action) => {
  switch(action.type) {
    case ADD_GROCERY:
      const newGroceries = state.groceryList.concat(action.grocery)
      return {...state, groceryList: newGroceries };
    case HANDLE_NAME_CHANGE:
      return {...state, name: action.newName};
    case CLEAR_FORM:
      return {...state, name: ''};
    default:
      return state;
  }
}

const ADD_GROCERY = 'ADD_GROCERY'
const addNewGrocery = grocery => {
  return {
    type: ADD_GROCERY,
    grocery
  }
}

const HANDLE_NAME_CHANGE = 'HANDLE_NAME_CHANGE'
const handleNameChange = event => {
  const newName = event.target.value
  return {
    type: HANDLE_NAME_CHANGE,
    newName
  }
}

const CLEAR_FORM = 'CLEAR_FORM'
const clearForm = () => {
  return {
    type: CLEAR_FORM
  }
}

export { 
  addNewGrocery,
  clearForm,
  handleNameChange,
  groceries 
}