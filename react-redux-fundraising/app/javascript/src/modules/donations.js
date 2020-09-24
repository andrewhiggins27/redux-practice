import { displayAlertMessage, closeAlertMessage } from '../modules/alertMessage'

const initialState = {
  donationList: [],
  newName: '',
  newComment: '',
  newAmount: ''
}

const donations = (state = initialState, action) => {
  switch(action.type) {
    case CLEAR_FORM:
      return {
        ...state,
        newName: '',
        newComment: '',
        newAmount: ''
      }
    case HANDLE_FIELD_CHANGE:
      return {...state, [action.newField]: action.newValue}
    case GET_DONATIONS_REQUEST_SUCCESS:
      return { ...state, donationList: action.donationList }
    case POST_DONATION_REQUEST_SUCCESS:
      const newList = state.donationList.concat(action.donation)
      return {
        ...state, donationList: newList
      }
    default:
      return state
  }
};

const HANDLE_FIELD_CHANGE = 'HANDLE_FIELD_CHANGE'

const handleFieldChange = event => {
  const newField = event.target.name
  const newValue = event.target.value

  return {
    type: HANDLE_FIELD_CHANGE,
    newField,
    newValue
  }
}

const CLEAR_FORM = 'CLEAR_FORM'

const clearForm = () => {
  return {
    type: CLEAR_FORM
  }
}

const GET_DONATIONS_REQUEST_SUCCESS = 'GET_DONATIONS_REQUEST_SUCCESS'

const getDonationsRequestSuccess = (donationList) => {
  return {
    type: GET_DONATIONS_REQUEST_SUCCESS,
    donationList
  }
}

const POST_DONATION_REQUEST_SUCCESS = 'POST_DONATION_REQUEST_SUCCESS'

const postDonationRequestSuccess = (donation) => {
  return {
    type: POST_DONATION_REQUEST_SUCCESS,
    donation
  }
}

const getDonations = (selectedCauseId) => {
  return dispatch => {
    return fetch(`/api/v1/causes/${selectedCauseId}/donations.json`)
    .then(response => response.json())
    .then(donations => {
      dispatch(getDonationsRequestSuccess(donations))
    })
  }
}

const postDonation = (donationInfo, selectedCauseId) => {
  return dispatch => {
    return fetch(`/api/v1/causes/${selectedCauseId}/donations.json`, 
    {
      method: 'POST',
      body: JSON.stringify(donationInfo),
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    })
    .then(response => {
      return response.json()
    })
    .then(donation => {
      if (!donation.errors) {
        dispatch(postDonationRequestSuccess(donation))
        dispatch(closeAlertMessage())
        dispatch(clearForm())
      } else {
        dispatch(displayAlertMessage(donation.errors))
      }
    })
  }
}

export {
  donations,
  postDonation,
  getDonations,
  HANDLE_FIELD_CHANGE,
  handleFieldChange,
  CLEAR_FORM,
  clearForm,
  GET_DONATIONS_REQUEST_SUCCESS,
  getDonationsRequestSuccess,
  POST_DONATION_REQUEST_SUCCESS,
  postDonationRequestSuccess
}
