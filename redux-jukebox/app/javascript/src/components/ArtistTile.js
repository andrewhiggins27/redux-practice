import React from 'react'

const ArtistTile = props => {
  const handleClick = () => {
    props.handleSelect(props.artist.id)
  }

  return(
    <div className='tile'>
      <h3 onClick={handleClick}>
        {props.artist.name}
      </h3>
    </div>
  )
}

export default ArtistTile
