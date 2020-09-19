const initialState = {
  artists: [],
  artistSongs: [],
  selectedArtistId: null,
  isFetching: false
}

const songs = (state = initialState, action) => {
  switch(action.type) {
    case GET_ARTISTS_REQUEST:
      return { 
        ...state, 
        isFetching: true 
      }
    case GET_ARTISTS_REQUEST_SUCCESS:
      return { 
        ...state,
        artists: action.artists,
        isFetching: false
      }
    case GET_ARTISTS_REQUEST_FAILURE:
      return { 
        ...state, 
        isFetching: false 
      }
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

export {
  songs,
  handleSelect,
  getArtists
}