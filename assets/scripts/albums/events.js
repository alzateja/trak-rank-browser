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

const getUserRatings = () => {
  console.log('try')
  api.getRatings()
    .then(ui.getRatingsSuccess)
    .catch(ui.failure)
}

// Add Albums
const addHandlers = () => {
  $('#addAlbumForm').on('submit', onCreateAlbum)
  $('#userStatsForm').on('submit', getUserRatings)
  $('#createalbumclose').on('click', ui.resetAlbumModal)
}

module.exports = {
  addHandlers,
  onGetAlbums,
  getUserRatings
}
