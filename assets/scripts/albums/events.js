'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields')

// Handlebars
const onGetAlbums = () => {
// const onGetAlbums = (event) => {
  // event.preventDefault()
  console.log('run Album get')
  api.getAlbums()
    .then(ui.getAlbumsSuccess)
    .catch(ui.failure)
}

const onClearAlbums = (event) => {
  console.log('run clear Album')
  event.preventDefault()
  ui.clearAlbums()
}

const onCreateAlbum = (event) => {
  event.preventDefault()
  let formValues = $('#addAlbumForm')[0]
  const data = getFormFields(formValues)
  console.log('run add Album')
  console.log(data)

  ui.clearAlbums()
  // onGetAlbums()
  api.addAlbum(data)
    .then(ui.addAlbumSuccess)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('#hbars').on('click', onGetAlbums)
  $('#clear-hbars').on('click', onClearAlbums)
  $('#addAlbumForm').on('submit', onCreateAlbum)
}

module.exports = {
  addHandlers,
  onGetAlbums
}
