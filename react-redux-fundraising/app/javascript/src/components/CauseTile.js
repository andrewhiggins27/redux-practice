import React from 'react';

const CauseTile = props => {
  return(
    <h3 onClick={props.handleSelect}>{props.name}</h3>
  )
}

export default CauseTile;
