import React from 'react';
import { Provider } from 'react-redux';

import CausesPageContainer from '../containers/CausesPageContainer'

const App = (props) => {
  return (
    <Provider store={props.store}>
      <CausesPageContainer />
    </Provider>
  )
}

export default App;
