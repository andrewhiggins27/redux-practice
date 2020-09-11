const ADD_DONUT = 'ADD_DONUT'
const HANDLE_CHANGE = 'HANDLE_CHANGE'
const CLEAR_FORM = 'CLEAR_FORM'

const addNewDonut = donut => {
  return {
    type: ADD_DONUT,
    donut
  }
}
const handleChange = event => {
  const inputName = event.target.name
  const inputValue = event.target.value
  return {
    type: HANDLE_CHANGE,
    inputName,
    inputValue
  }
}
const clearForm = () => {
  return {
    type: CLEAR_FORM
  }
}

const initialState = {
  donutOrderList: [
    {
      id: 1,
      name: 'Brianna',
      flavor: 'Everything Bagel Doughnut'
    },
    {
      id: 2,
      name: "Alex",
      flavor: 'Blackberry Hibiscus'
    },
    {
      id: 3,
      name: 'Dan',
      flavor: 'The biggest coffee roll ever'
    }
  ],
  newName: '',
  newFlavor: ''
}

const donuts = (state = initialState, action) => {
  switch(action.type) {
    case ADD_DONUT:
      const newDonutOrderList = state.donutOrderList.concat(action.donut)
      return {
        ...state, 
        donutOrderList: newDonutOrderList
      };
    case HANDLE_CHANGE:
      return {...state, [action.inputName]: action.inputValue};
    case CLEAR_FORM:
      return {
        ...state,
        newName: '',
        newFlavor: ''
      };
    default:
      return state
  }
};

export {
  addNewDonut,
  handleChange,
  clearForm,
  donuts
};
