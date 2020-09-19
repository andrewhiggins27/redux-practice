import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getArtists, handleSelect } from '../modules/playlists'

import ArtistTile from '../components/ArtistTile'

class ArtistsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getArtists()
  }

  render() {
    const artistTiles = this.props.artists.map(artist => {
      return(
        <ArtistTile
          key={artist.id}
          artist={artist}
          handleSelect={this.props.handleSelect}
        />
      )
    })

    return (
      <div className='columns small-10 medium-4'>
        <h1>Artists</h1>
        {artistTiles}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    artists: state.playlists.artists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtists: () => dispatch(getArtists()),
    handleSelect: (artistId) => dispatch(handleSelect(artistId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistsIndexContainer)
