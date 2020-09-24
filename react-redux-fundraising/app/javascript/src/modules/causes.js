const initialState = {
  causeList: [],
  selectedCauseId: null
}

const causes = (state = initialState, action) => {
  switch(action.type) {
    case GET_CAUSES_REQUEST_SUCCESS:
      return { ...state, causeList: action.newCauses }
    case CAUSE_SELECTED:
      return { ...state, selectedCauseId: action.causeId}
    default:
      return state
  }
};

const GET_CAUSES_REQUEST_SUCCESS = 'GET_CAUSES_REQUEST_SUCCESS'

const getCausesRequestSuccess = newCauses => {
  return {
    type: GET_CAUSES_REQUEST_SUCCESS,
    newCauses
  }
}

const CAUSE_SELECTED = 'CAUSE_SELECTED'

const causeSelected = (causeId) => {
  return {
    type: CAUSE_SELECTED,
    causeId
  }
}

const getCauses = () => {
  return (dispatch) => {
    return fetch('/api/v1/causes.json')
    .then(response => response.json())
    .then(causes => {
      dispatch(getCausesRequestSuccess(causes))
    })
  }
}

export {
  causes,
  getCauses,
  causeSelected
};
