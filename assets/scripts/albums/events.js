'use strict'

const api = require('./api.js')
const ui = require('./ui.js')

const onGetAlbums = (event) => {
  event.preventDefault()
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

const addHandlers = () => {
  $('#hbars').on('click', onGetAlbums)
  $('#clear-hbars').on('click', onClearAlbums)
}

module.exports = {
  addHandlers
}
