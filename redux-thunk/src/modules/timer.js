const initialState = {
  isRunning: false,
  sendAlert: false
}

// REDUCER
const timer = (state = initialState, action) => {
  switch(action.type) {
    case START_TIMER:
      return { ...state,
           isRunning: true,
           sendAlert: false

      }
    case END_TIMER_SUCCESSFULLY:
      return { ...state,
           isRunning: false,
           sendAlert: true
      }
    default:
      return state
  }
}

// ACTIONS
const START_TIMER = 'START_TIMER'

const startTimer = () => {
  return {
    type: START_TIMER
  }
}

const END_TIMER_SUCCESSFULLY = 'END_TIMER_SUCCESSFULLY'

const endTimerSuccessfully = () => {
  return {
    type: END_TIMER_SUCCESSFULLY
  }
}

// Asynchronous action creator
const startTimerWithTimeout = () => {
  return dispatch => {
    dispatch(startTimer())

    return setTimeout(() => {
      dispatch(endTimerSuccessfully())
    }, 3000)
  }
}

export {
  timer,
  startTimerWithTimeout
}