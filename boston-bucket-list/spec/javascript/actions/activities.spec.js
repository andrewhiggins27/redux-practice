import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
  getActivities,
  getActivitiesRequestSuccess,
  GET_ACTIVITIES_REQUEST_SUCCESS,
  patchActivity,
  updateActivityStatus,
  UPDATE_ACTIVITY_STATUS
} from '../../../app/javascript/react/modules/activities'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getActivitiesRequestSuccess action creator', () => {
  it('should create an GET_ACTIVITIES_REQUEST_SUCCESS action', () => {
    const newActivities = [{id: 1, name: "Finish Breakfast"}]
    const action = getActivitiesRequestSuccess(newActivities)

    expect(action).toEqual({
      type: GET_ACTIVITIES_REQUEST_SUCCESS,
      newActivities
    })
  })
})

describe('updateActivityStatus action creator', () => {
  it('should create an UPDATE_ACTIVITY_STATUS action', () => {
    const updatedActivity = {id: 1, name: "Finish Breakfast"}
    const action = updateActivityStatus(updatedActivity)

    expect(action).toEqual({
      type: UPDATE_ACTIVITY_STATUS,
      updatedActivity
    })
  })
})

describe('getActivities', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('calls the request and success actions if the fetch response was successful', done => {
    const newActivities = [
      { "id": 1, "name": "Find breakfast" },
      { "id": 2, "name": "aquire lunch"}
    ]

    fetchMock.get('/api/v1/activities.json', {
      status: 200,
      body: newActivities
    })

    const expectedActions = [
      { type: GET_ACTIVITIES_REQUEST_SUCCESS, newActivities}
    ]
    const store = mockStore({
      activityList: []
    })

    store
      .dispatch(getActivities())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
  })
})

describe('patchActivity', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('calls the request and success actions if the fetch response was successful', done => {
    const updatedActivity = { "id": 1, "name": "Find breakfast", complete: false}
    
    fetchMock.patch(`/api/v1/activities/${updatedActivity.id}.json`, {
      status: 200,
      body: updatedActivity
    }) 

    const expectedActions = [
      { type:UPDATE_ACTIVITY_STATUS, updatedActivity }
    ]
    const store = mockStore({
      activityList: []
    })

    store
      .dispatch(patchActivity(updatedActivity.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
  })
})