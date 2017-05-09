'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields')

// CREATE AN ALBUM
const onCreateAlbum = (event) => {
  event.preventDefault()
  $('.add-album-modal-alert').hide()
  const formValues = $('#addAlbumForm')[0]
  const data = getFormFields(formValues)
  console.log('run add Album', data)

  // Blank Field Check
  if (data.album.album === '' || data.album.artist === '') {
    $('#add-album-blank-field-failure-alert').show()
    return
  }
// add album and update lists
  api.addAlbum(data)
    .then(ui.addAlbumSuccess)
    .then(onGetAlbums)
    .catch(ui.addAlbumFailure)
}

// GET ALL ALBUMS
const onGetAlbums = () => {
  api.getAlbums()
    .then(ui.getAlbumsSuccess)
    .then(getUserRatings)
    .catch(ui.getAlbumsFailure)
}

// GET ALL User Ratings
const getUserRatings = () => {
  console.log('run get user ratings')
  api.getRatings()
    .then(ui.getRatingsSuccess)
    .then(ui.calculateStats)
    .catch(ui.getRatingsFailure)
}

// Function for User Ratings button
const launchUserRatingsModal = () => {
  getUserRatings()
  $('#userStatsForm').modal('show')
}

// Add Album Handlers
const addHandlers = () => {
  $('#addAlbumForm').on('submit', onCreateAlbum)
  $('#user-stats-tab').on('click', launchUserRatingsModal)
  $('#createalbumclose').on('click', ui.resetAddAlbumModal)
  $('#userstatsclose').on('click', ui.resetUserStatsModal)
}

module.exports = {
  addHandlers,
  onGetAlbums,
  getUserRatings
}
