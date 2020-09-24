import React from 'react';

const DonationTile = props => {
  return(
    <div>
      <p><strong>{props.name}</strong> donated ${props.amount}</p>
      <p>"{props.comment}"</p>
    </div>
  )
}

export default DonationTile;
