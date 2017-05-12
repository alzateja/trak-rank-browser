'use strict'

let store = require('../store')

// GET ONE ALBUM INFORMATION
const getAlbumInfoSuccess = (data) => {
  console.log('Single Album get success')
  store.album = data.album
  $('#albumIDDisplay').text(data.album.id)
  $('#rankingDisplay').text(data.album.ranking)
  $('#artistDisplay').text(data.album.artist)
  $('#albumDisplay').text(data.album.album)
  $('#yearDisplay').text(data.album.year)
  $('#formImage').html('<img src="' + data.album.image + '" class="img-responsive">')
  // If no ranking display as N/A
  if (data.album.ranking === null) {
    $('#rankingDisplay').text('N/A')
  }
}

// Get Album Info Failure
const getAlbumInfoFailure = (error) => {
  console.log('Failed to get single album data')
  console.log(error)

// Server Error
  if (error.statusText === 'error') {
    $('#view-album-api-failure-alert').show()
    $('.on-hide-album-info').hide()
    return
  }
}

// On Get Album Rating Success
const getAlbumRatingInfoSuccess = (data) => {
  console.log(data)
  store.user_rating = null

// If no rating found, then pop up alert
  if (data.user_ratings.length === 0) {
    console.log('No data found')
    $('.rating-not-found-hide').hide()
    $('#view-album-no-ratings-alert').show()
    $('#delete-ratings').hide()
    return
  }

  // Else populate user rating data into the form
  store.user_rating = data.user_ratings[0]
  $('#commentDisplay').text(data.user_ratings[0].comment)
  $('#statusDisplay').text(data.user_ratings[0].status)
  $('#ratingDisplay').text(data.user_ratings[0].ratings)
  $('#rating-reference').text(data.user_ratings[0].id)

  if (data.user_ratings[0].comment === null) {
    $('.comment-not-found-hide').hide()
  }
}

// On Failed to get Album Ratings
const getAlbumRatingInfoFailure = (error) => {
  console.log(error)
  console.log('Failed to get single album data rating')
  console.log(error)
}

module.exports = {
  getAlbumInfoSuccess,
  getAlbumInfoFailure,
  getAlbumRatingInfoSuccess,
  getAlbumRatingInfoFailure
}
