'use strict'

const api = require('./api.js')
const ui = require('./ui.js')

// Delete or remove a Rating
const onResetRating = () => {
  event.preventDefault()
  $('.view-album-modal-alert').hide()
  console.log('run Delete Rating')
  const userRatingId = $('#rating-reference').text()
  // Check to see if there is any rating to delete
  if (userRatingId === null || userRatingId === '') {
    $('#ratings-delete-failure-alert').show()
    $('#save-ratings').hide()
    return
  }
// Running the delete AJAX
  api.resetAlbumRating(userRatingId)
    .then(ui.resetAlbumRatingSuccess)
    .catch(ui.resetAlbumRatingFailure)
}

// Patch and Post Update
const createUpdateRatings = function (event) {
  event.preventDefault()
  $('.view-album-modal-alert').hide()

  const ratings = $('#album-rating-select').text()
  const status = $('#album-status-select').text()
  const albumId = $('#albumIDDisplay').text()
  const comment = $('#comment-item').val()

  // Check to see if you should make an update
  if (comment === '' &&
    (ratings === 'Rating' ||
    ratings === 'None') &&
    status === 'Album Status') {
    $('#ratings-nothing-to-update-failure-alert').show()
    return
  }

    const data = {}
    data.user_rating = {}
    data.user_rating.album_id = albumId

    if (comment !== '') {
      data.user_rating.comment = comment
    }
    if (ratings !== 'Rating' || ratings !== 'None') {
      data.user_rating.ratings = ratings
    }

    if (status !== 'Album Status') {
      data.user_rating.status = status
    }
    console.log(data)

// If no Rating then Create
    if ($('#rating-reference').text() === '') {
      api.createAlbumRating(data)
        .then(ui.createAlbumRatingSuccess)
        .catch(ui.updateCreateAlbumFailure)
    } else {
      console.log($('#rating-reference').text())
// If Rating found then post
      let id = $('#rating-reference').text()
      api.updateAlbumRating(data, id)
        .then(ui.updateAlbumRatingSuccess)
        .catch(ui.updateCreateAlbumFailure)
    }
}

// UI view of selection on modal
const albumStatusSetState = function (event) {
  event.preventDefault()
  $('#album-status-select').text(event.currentTarget.text)
}

const ratingSetState = function (event) {
  event.preventDefault()
  $('#album-rating-select').text(event.currentTarget.text)
}

const addHandlers = () => {
  $('#delete-ratings').on('click', onResetRating)
  $(document).on('click', '#album-rating-select', ratingSetState)
  $(document).on('click', '.status-select', albumStatusSetState)
  $(document).on('click', '.rating-select', ratingSetState)
  $('#save-ratings').on('click', createUpdateRatings)
  $('#close-album-ratings-view').on('click', ui.resetViewAlbumModal)
}

module.exports = {
  addHandlers
}
