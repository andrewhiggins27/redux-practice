import {
  activities,
  initialState,
  GET_ACTIVITIES_REQUEST_SUCCESS,
  UPDATE_ACTIVITY_STATUS,
  updateActivityStatus
} from '../../../app/javascript/react/modules/activities'

describe('activities reducer', () => {
  it('should set an initial state', () => {
    const newState = activities(undefined, {})
    expect(newState).toEqual(initialState)
  })

  it('updates the activity list when GET_ACTIVITIES_REQUEST_SUCCESS action type is received', () => {
    const newActivities = [{id: 1, name: "Finish Breakfast"}]
    const action = { type: GET_ACTIVITIES_REQUEST_SUCCESS, newActivities }
    const newState = activities(initialState, action)

    expect(newState.activityList).toEqual(newActivities)
  })

  it('updates the activity list when UPDATE_ACTIVITY_STATUS action type is received', () => {
    const stateWithList = { activityList: [{id: 1, name: "Finish Breakfast", complete: false}, { id:2, name: "write tests", complete: true }] }
    const updatedActivity = {id: 1, name: "Finish Breakfast", complete: true}
    const updatedList = [{id: 1, name: "Finish Breakfast", complete: true}, { id:2, name: "write tests", complete: true }]

    const action = { type: UPDATE_ACTIVITY_STATUS, updatedActivity }
    const newState = activities(stateWithList, action)

    expect(newState.activityList).toEqual(updatedList)
  })
})
