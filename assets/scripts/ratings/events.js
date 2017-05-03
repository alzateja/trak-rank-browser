'use strict'

const api = require('./api.js')
const ui = require('./ui.js')

// Can be used for stats

const onResetRating = () => {
  event.preventDefault()
  console.log('run Album get2')
  let userRatingId = $('#rating-reference').text()
  console.log(userRatingId)
  if (userRatingId === null || userRatingId === '') {
    console.log('empty')
    ui.resetRatingModal()
    return
  }

  api.resetAlbumRating(userRatingId)
    .then(ui.resetAlbumSuccess)
    .catch(ui.failure)
}

const createUpdateRatings = function(event) {
  event.preventDefault()
  console.log(event)
  let ratings = $('#album-rating-select').text()
  let status = $('#album-status-select').text()
  let albumId = $('#albumIDDisplay').text()
  let comment = $('comment-item').text()
  console.log(comment);
  // Check to see if you should make an update
  if ($('#comment-item').val() !== '' ||
    ratings !== 'Rating' ||
    status !== 'Album Status') {
    // Check t
    const data = {}
    data.user_rating = {}
    console.log('Empty object', data)
    data.user_rating.album_id = albumId
    console.log('albumId object', data)
    if ($('#comment-item').val()) {
      data.user_rating.comment = $('#comment-item').val()
      console.log('rating object', data)
    }
    if (ratings !== 'Rating') {
      data.user_rating.ratings = ratings
      console.log('rating object', data)
    }
    if (status !== 'Album Status') {
      data.user_rating.status = status
      console.log('status object', data)
    }
    console.log(data)

    if ($('#rating-reference').text() === '') {
      api.createAlbumRating(data)
        .then(ui.createAlbumRatingSuccess)
        .catch(ui.failure)
    } else {
      console.log($('#rating-reference').text())

      let id = $('#rating-reference').text()
      api.updateAlbumRating(data, id)
        .then(ui.updateAlbumRatingSuccess)
        .catch(ui.failure)
    }
  }

  console.log('Message back No update necessary')
}

// UI view of selection on modal
const albumStatusSetState = function (event) {
  event.preventDefault()
  console.log(event)
  console.log(event.currentTarget.text)

  $('#album-status-select').text(event.currentTarget.text)
}
const ratingSetState = function (event) {
  event.preventDefault()
  $('#album-rating-select').text(event.currentTarget.text)
}

const addHandlers = () => {
  $('#deleteratings').on('click', onResetRating)
  $(document).on('click', '#album-rating-select', ratingSetState)
  $(document).on('click', '.status-select', albumStatusSetState)
  $(document).on('click', '.rating-select', ratingSetState)
  $('#saveratings').on('click', createUpdateRatings)
}

module.exports = {
  addHandlers
}
