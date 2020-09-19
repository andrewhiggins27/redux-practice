const initialState = {
  playlistSongs: [],
  isFetching: false
}

const playlists = (state = initialState, action) => {
  switch(action.type) {
    case GET_PLAYLIST_SONGS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case GET_PLAYLIST_SONGS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        playlistSongs: action.playlistSongs
      }
    case GET_PLAYLIST_SONGS_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case ADD_PLAYLIST_SONG_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case ADD_PLAYLIST_SONG_REQUEST_SUCCESS:
      const newPlaylistSongs = state.playlistSongs.concat(action.song)
      return {
        ...state,
        isFetching: false,
        playlistSongs: newPlaylistSongs
      }
    case ADD_PLAYLIST_SONG_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case DELETE_PLAYLIST_SONG_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case DELETE_PLAYLIST_SONG_REQUEST_SUCCESS:
      const updatedPlaylistSongs = state.playlistSongs.filter(song => song.id !== action.song.id)

      return {
        ...state,
        isFetching: false,
        playlistSongs: updatedPlaylistSongs
      }
    case DELETE_PLAYLIST_SONG_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

const GET_PLAYLIST_SONGS_REQUEST = 'GET_PLAYLIST_SONGS_REQUEST'

const getPlaylistSongsRequest = () => {
  return {
    type: GET_PLAYLIST_SONGS_REQUEST
  }
}

const GET_PLAYLIST_SONGS_REQUEST_SUCCESS = 'GET_PLAYLIST_SONGS_REQUEST_SUCCESS'

const getPlaylistSongsRequestSuccess = (playlistSongs) => {
  return {
    type: GET_PLAYLIST_SONGS_REQUEST_SUCCESS,
    playlistSongs
  }
}

const GET_PLAYLIST_SONGS_REQUEST_FAILURE = 'GET_PLAYLIST_REQUEST_SONGS_FAILURE'

const getPlaylistSongsRequestFailure = () => {
  return {
    type: GET_PLAYLIST_SONGS_REQUEST_FAILURE
  }
}

const ADD_PLAYLIST_SONG_REQUEST = 'ADD_PLAYLIST_SONG_REQUEST'

const addPlaylistSongRequest = () => {
  return {
    type: ADD_PLAYLIST_SONG_REQUEST
  }
}

const ADD_PLAYLIST_SONG_REQUEST_SUCCESS = 'ADD_PLAYLIST_SONG_REQUEST_SUCCESS'

const addPlaylistSongRequestSuccess = (song) => {
  return {
    type: ADD_PLAYLIST_SONG_REQUEST_SUCCESS,
    song
  }
}

const ADD_PLAYLIST_SONG_REQUEST_FAILURE = 'ADD_PLAYLIST_SONG_REQUEST_FAILURE'

const addPlaylistSongRequestFailure = () => {
  return {
    type: ADD_PLAYLIST_SONG_REQUEST_FAILURE
  }
}

const DELETE_PLAYLIST_SONG_REQUEST = 'DELETE_PLAYLIST_SONG_REQUEST'

const deletePlaylistSongRequest = () => {
  return {
    type: DELETE_PLAYLIST_SONG_REQUEST
  }
}

const DELETE_PLAYLIST_SONG_REQUEST_SUCCESS = 'DELETE_PLAYLIST_SONG_REQUEST_SUCCESS'

const deletePlaylistSongRequestSuccess = (song) => {
  return {
    type: DELETE_PLAYLIST_SONG_REQUEST_SUCCESS,
    song
  }
}

const DELETE_PLAYLIST_SONG_REQUEST_FAILURE = 'DELETE_PLAYLIST_SONG_REQUEST_FAILURE'

const deletePlaylistSongRequestFailure = () => {
  return {
    type: DELETE_PLAYLIST_SONG_REQUEST_FAILURE
  }
}

const addNewSong = song => {
  return (dispatch) => {
    dispatch(addPlaylistSongRequest())

    return fetch(`api/v1/songs/${song.id}/playlist_songs`,
      {
        method: 'POST',
        body: JSON.stringify(song),
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(addPlaylistSongRequestFailure())
        return { error: 'Something went horribly wrong.' }
      }
    })
    .then(song => {
      if(!song.error) {
        dispatch(addPlaylistSongRequestSuccess(song))
      }
    })
  }
}

const getPlaylistSongs = () => {
  return (dispatch) => {
    dispatch(getPlaylistSongsRequest)

    return fetch('api/v1/playlist_songs')
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        dispatch(getPlaylistSongsRequestFailure())
        return { error: 'Something went horribly wrong' }
      }
    })
    .then(playlistSongs => {
      if (!playlistSongs.error) {
        dispatch(getPlaylistSongsRequestSuccess(playlistSongs))
      }
    })
  }
}

const deletePlaylistSong = (song) => {
  return (dispatch) => {
    dispatch(deletePlaylistSongRequest())

    return fetch(`api/v1/playlist_songs/${song.id}`,
      {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(response => {
      if(response.ok) {
        return {}
      } else {
        dispatch(deletePlaylistSongRequestFailure())
        return { error: 'Something went horribly wrong.' }
      }
    })
    .then(body => {
      if(!body.error) {
        dispatch(deletePlaylistSongRequestSuccess(song))
      }
    })
  }
}

export {
  playlists,
  addNewSong,
  getPlaylistSongs,
  deletePlaylistSong
}
