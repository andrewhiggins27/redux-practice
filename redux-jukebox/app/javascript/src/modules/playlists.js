const initialState = {
  artists: [],
  artistSongs: [],
  selectedArtistId: null,
  playlistSongs: [],
  isFetching: false
}

const playlists = (state = initialState, action) => {
  switch(action.type) {
    case GET_ARTISTS_REQUEST:
      return { ...state, isFetching: true }
    case GET_ARTISTS_REQUEST_SUCCESS:
      return { 
        ...state,
        artists: action.artists,
        isFetching: false
      }
    case GET_ARTISTS_REQUEST_FAILURE:
      return { ...state, isFetching: false }
    case GET_SONGS_REQUEST:
      return { 
        ...state, 
        isFetching: true,
        selectedArtistId: action.artistId
      }
    case GET_SONGS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        artistSongs: action.songs
      }
    case GET_SONGS_REQUEST_FAILURE:
      return { 
        ...state, 
        isFetching: false,
        selectedArtistId: null
      }
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

const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST'

const getArtistsRequest = () => {
  return {
    type: GET_ARTISTS_REQUEST
  }
}

const GET_ARTISTS_REQUEST_SUCCESS = 'GET_ARTISTS_REQUEST_SUCCESS'

const getArtistsRequestSuccess = (artists) => {
  return {
    type: GET_ARTISTS_REQUEST_SUCCESS,
    artists
  }
}

const GET_ARTISTS_REQUEST_FAILURE = 'GET_ARTISTS_REQUEST_FAILURE'

const getArtistsRequestFailure = () => {
  return {
    type: GET_ARTISTS_REQUEST_FAILURE
  }
}

const GET_SONGS_REQUEST = 'GET_SONGS_REQUEST'

const getSongsRequest = (artistId) => {
  return {
    type: GET_SONGS_REQUEST,
    artistId
  }
}

const GET_SONGS_REQUEST_SUCCESS = 'GET_SONGS_REQUEST_SUCCESS'

const getSongsRequestSuccess = (songs) => {
  return {
    type: GET_SONGS_REQUEST_SUCCESS,
    songs
  }
}

const GET_SONGS_REQUEST_FAILURE = 'GET_SONGS_REQUEST_FAILURE'

const getSongsRequestFailure = () => {
  return {
    type: GET_SONGS_REQUEST_FAILURE
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

const handleSelect = artistId => {
  return (dispatch) => {
    dispatch(getSongsRequest(artistId))

    return fetch(`api/v1/artists/${artistId}/songs`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        dispatch(getSongsRequestFailure())
        return { error: 'Something went horribly wrong'}
      }
    })
    .then(songs => {
      if (!songs.error) {
        dispatch(getSongsRequestSuccess(songs))
      }
    })
  }
}

const getArtists = () => {
  return (dispatch) => {
    dispatch(getArtistsRequest())

    return fetch('api/v1/artists')
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        dispatch(getArtistsRequestFailure())
        return { error: 'Something went horribly wrong' }
      }
    })
    .then(artists => {
      if (!artists.error) {
        dispatch(getArtistsRequestSuccess(artists))
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
  getArtists,
  getPlaylistSongs,
  addNewSong,
  deletePlaylistSong,
  handleSelect
}
