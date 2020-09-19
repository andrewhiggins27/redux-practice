import React, { Component } from 'react'
import { connect } from 'react-redux'

import SongTile from '../components/SongTile'
import { getPlaylistSongs, deletePlaylistSong } from '../modules/playlists'

class PlaylistContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getPlaylistSongs()
  }

  render() {
    const playlistSongs = this.props.playlistSongs

    const songTiles = playlistSongs.map(playlistSong => {
      const handleClick = () => {
        this.props.deletePlaylistSong(playlistSong)
      }

      return(
        <SongTile
          key={playlistSong.id}
          song={playlistSong.song}
          // below can be left alone until working on Exceeds functionality
          handleClick={handleClick}
          type='delete'
        />
      )
    })

    return(
      <div className='columns small-10 medium-4'>
        <h1>Current Playlist</h1>
        {songTiles}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playlistSongs: state.playlists.playlistSongs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaylistSongs: () => dispatch(getPlaylistSongs()),
    deletePlaylistSong: (song) => dispatch(deletePlaylistSong(song))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistContainer)
