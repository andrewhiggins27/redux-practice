import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

import {
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
} from '../../../app/javascript/src/modules/donations'

import { CLOSE_ALERT_MESSAGE, DISPLAY_ALERT_MESSAGE } from '../../../app/javascript/src/modules/alertMessage'

describe('getDonationsRequestSuccess action creator', () => {
  it('creates a GET_DONATIONS_REQUEST_SUCCESS action', () => {
    const donationList = [{ id: 1, name: "Paul"}]
    const action = getDonationsRequestSuccess(donationList)
    expect(action).toEqual({
      type: GET_DONATIONS_REQUEST_SUCCESS,
      donationList
    })
  })
})

describe('postDonationRequestSuccess action creator', () => {
  it('creates a POST_DONATION_REQUEST_SUCCESS action', () => {
    const donation = { id: 1, name: "Paul"}
    const action = postDonationRequestSuccess(donation)
    expect(action).toEqual({
      type: POST_DONATION_REQUEST_SUCCESS,
      donation
    })
  })
})

describe('clearForm action creator', () => {
  it ('creates a CLEAR_FORM action', () => {
    const action = clearForm()
    expect(action).toEqual({
      type: CLEAR_FORM
    })
  })
})

describe('handleFieldChange action creator', () => {
  it ('creates a HANDLE_FIELD_CHANGE action', () => {
    const event =  { target: {
      name: 'newField',
      value: 'newValue'
    }}
    const action = handleFieldChange(event)

    expect(action).toEqual({
      type: HANDLE_FIELD_CHANGE,
      newField: 'newField',
      newValue: 'newValue'
    })
  })
})

describe('getDonations', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('calls the success actions if the fetch response was successful', done => {
    const newDonations = [
      { "id": 1, "name": "Paul" },
      { "id": 2, "name": "Susan"}
    ]

    fetchMock.get('/api/v1/causes/1/donations.json', {
      status: 200,
      body: newDonations
    })

    const expectedActions = [
      { type: GET_DONATIONS_REQUEST_SUCCESS, donationList: newDonations}
    ]
    const store = mockStore({
      donationList: [],
    })

    store
      .dispatch(getDonations(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
  })
})


describe('postDonation', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const donation = {
    "id": 1,
    "name": "Paul"
  }

  it('calls the success action if the fetch response was successful', done => {
    fetchMock.post('/api/v1/causes/1/donations.json', {
      status: 202,
      body: donation
    })

    const expectedActions = [
      { type: POST_DONATION_REQUEST_SUCCESS, donation },
      { type: CLOSE_ALERT_MESSAGE}, 
      { type: CLEAR_FORM}
    ]

    const store = mockStore({
      donationList: []
    })

    store
      .dispatch(postDonation(donation, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
  })

  it('calls the display alert message action if the fetch response has errors', done => {
    const errorDonation = { errors: 'errors' }

    fetchMock.post('/api/v1/causes/1/donations.json', {
      status: 404,
      body: errorDonation
    })

    const expectedActions = [
      { 
        type: DISPLAY_ALERT_MESSAGE, 
        alertMessage: 'errors'
      }
    ]

    const store = mockStore({
      donationList: []
    })

    store
      .dispatch(postDonation(errorDonation, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
  })
})