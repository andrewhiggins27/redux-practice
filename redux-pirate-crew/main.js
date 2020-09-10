const { createStore } = Redux;

const initialState = {
  crew: [
    {
      name: "Alfonsu Sabreborne"
    },
    {
      name: "Gravy Davy"
    },
    {
      name: "Long John Bronze"
    }
  ],
  planked: [

  ]
}

const crewReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_CREW:
      const newCrewArray = state.crew.concat(action.newCrew)
      return Object.assign({}, state, {
        crew: newCrewArray
      })
    case WALK_PLANK:
      const crewArray = state.crew
      const plankedCrew = crewArray.shift()
      const newPlankedCrewArray = state.planked.concat(plankedCrew)
      return Object.assign({}, state, {
        crew: crewArray,
        planked: newPlankedCrewArray
      })
    default:
      return state;
  }
}

const newCrewForm = document.getElementById('new-pirate-form')

const ADD_CREW = 'ADD_CREW'
const addCrewToList = newCrew => {
  return {
    type: ADD_CREW,
    newCrew: newCrew
  }
}

newCrewForm.addEventListener('submit', () => {
  event.preventDefault()
  crewName = document.getElementById('name').value
  document.getElementById('name').value = ''
  const newCrew = { name: crewName }
  store.dispatch(addCrewToList(newCrew))
})

const walkPlankButton = document.getElementById('walk-the-plank')

const WALK_PLANK = 'WALK_PLANK'
const walkThePlank = () => {
  return {
    type: WALK_PLANK
  }
}

walkPlankButton.addEventListener('click', () => {
  event.preventDefault()
  store.dispatch(walkThePlank())
})

const store = createStore(crewReducer)

const currentCrew = document.getElementById('current-crew')
const plankedCrew = document.getElementById('walked-crew')
const numberOfPlanked = document.getElementById('plank-walkers')

const render = () => {
  let newCrewList = ''
  let newPlankedList = ''

  store.getState().crew.forEach(crew => {
    newCrewList += `<li>${crew.name}</li>`
  })
  currentCrew.innerHTML = newCrewList

  store.getState().planked.forEach(crew => {
    newPlankedList += `<li>${crew.name}</li>`
  })
  plankedCrew.innerHTML = newPlankedList

  let newNumOfPlanked = `<p>${store.getState().planked.length}</p>`
  numberOfPlanked.innerHTML = newNumOfPlanked
}

render()
store.subscribe(render)