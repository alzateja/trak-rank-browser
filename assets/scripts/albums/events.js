'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields')

const onCreateAlbum = (event) => {
  event.preventDefault()
  let formValues = $('#addAlbumForm')[0]
  const data = getFormFields(formValues)
  console.log('run add Album')
  console.log(data)

// ADD Album
  api.addAlbum(data)
    .then(ui.addAlbumSuccess)
    .catch(ui.failure)

    // Update store
  onGetAlbums()
}

const onGetAlbums = () => {
  api.getAlbums()
    .then(ui.getAlbumsSuccess)
    .catch(ui.failure)
  getUserRatings()
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
}

module.exports = {
  addHandlers,
  onGetAlbums,
  getUserRatings
}
