import {
  donations,
  HANDLE_FIELD_CHANGE,
  CLEAR_FORM,
  GET_DONATIONS_REQUEST_SUCCESS,
  POST_DONATION_REQUEST_SUCCESS,
} from '../../../app/javascript/src/modules/donations'

describe('donations reducer', () => {
  let initialState

  beforeAll(() => {
    initialState = {
      donationList: [],
      newName: '',
      newComment: '',
      newAmount: ''
    }
  })

  it('sets an initial state', () => {
    const newState = donations(undefined, {})
    expect(newState).toEqual(initialState)
  })

  it('updates the grocery list when POST_DONATION_REQUEST_SUCCESS action type is received', () => {
    const donation = { id: 1, name: 'Paul' }
    const action = { type: POST_DONATION_REQUEST_SUCCESS, donation }
    const newState = donations(initialState, action)

    expect(newState.donationList).toEqual([donation])
  })

  it('updates the grocery list when GET_DONATIONS_REQUEST_SUCCESS action type is received', () => {
    const newDonations = [{ id: 1, name: 'Paul' }, {id: 2, name: 'Susan'}]
    const action = { type: GET_DONATIONS_REQUEST_SUCCESS, donationList: newDonations }
    const newState = donations(initialState, action)

    expect(newState.donationList).toEqual(newDonations)
  })

  it('updates the field when HANDLE_FIELD_CHANGE action type is received', () => {
    const newValue = 'Paul'
    const newField = 'newName'

    const action = { type: HANDLE_FIELD_CHANGE, newValue, newField }
    const newState = donations(initialState, action)

    expect(newState.newName).toEqual(newValue)
  })

  it('should clear the name when CLEAR_FORM action type is received', () => {
    const stateWithName = {
      groceryList: [],
      newName: 'bread'
    }

    const action = { type: CLEAR_FORM }
    const newState = donations(stateWithName, action)

    expect(newState.newName).toEqual('')
  })
})
