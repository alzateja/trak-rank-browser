'use strict'
const store = require('../store.js')
// RESET ALBUM RATING
const resetAlbumRatingSuccess = (data) => {
  console.log(store)
  console.log('Deleted an album entry')
  console.log(data)
  $('#save-ratings').hide()
  $('#delete-ratings').hide()
  $('.user-input-form-hide').hide()
  $('#ratings-delete-success-alert').show()
}

const resetAlbumRatingFailure = (error) => {
  console.log(store)
  console.log('Failed to deleted an album rating')
  console.log(error)
  $('#save-ratings').hide()
  $('#delete-ratings').hide()
  $('.user-input-form-hide').hide()
  $('#ratings-delete-failure-alert').show()
}

// Reset Rating Modal
const resetViewAlbumModal = () => {
  console.log('Resetting the View Rating Modal')

  // Hide alerts
  $('.view-album-modal-alert').hide()
  // Show rating not found
  $('.on-hide-album-info').show()
  $('.rating-not-found-hide').show()
  $('.comment-not-found-hide').show()
  $('.user-input-form-hide').show()
  // Clear values
  $('.view-album-info').text('')
  $('.ratingoutput').text('')
  $('.ratingoutput').val('')
  $('#commentDisplay').val('')
  $('#album-status-select').text('Album Status')
  $('#album-rating-select').text('Rating')
  // buttons
  $('#save-ratings').show()
  $('#delete-ratings').show()
  // Hide Modal
  $('#viewAlbumForm').modal('hide')
}

// CREATED ALBUM RATING SUCCESS
const createAlbumRatingSuccess = () => {
  console.log(store)
  console.log('Created an album rating')
  $('#save-ratings').hide()
  $('#delete-ratings').hide()
  $('.user-input-form-hide').hide()
  $('#ratings-update-success-alert').show()
}

// RESET ALBUM RATING
const updateAlbumRatingSuccess = () => {
  console.log(store)
  console.log('Updated an album rating')
  $('#save-ratings').hide()
  $('#delete-ratings').hide()
  $('.user-input-form-hide').hide()
  $('#ratings-update-success-alert').show()
}

const updateCreateAlbumFailure = (error) => {
  console.log(store)
  console.log('Created or update Album rating Failure')
  console.log(error)
  $('#save-ratings').hide()
  $('#delete-ratings').hide()
  $('.user-input-form-hide').hide()
  $('#ratings-update-failure-alert').show()
}

module.exports = {
  resetAlbumRatingSuccess,
  createAlbumRatingSuccess,
  updateAlbumRatingSuccess,
  resetViewAlbumModal,
  resetAlbumRatingFailure,
  updateCreateAlbumFailure
}
