'use strict'
const albumEvents = require('../ratings/events.js')
let store = require('../store')

const showAlbumsTemplate = require('../templates/album-listing.handlebars')

const getAlbumsSuccess = (data) => {
  console.log('Get All Albums success')
  let showAlbumsHtml = showAlbumsTemplate({ albums: data.albums })
  $('.content').append(showAlbumsHtml)
  $('.rate-album').on('click', albumEvents.onViewAlbumDetail)
}

const clearAlbums = () => {
  console.log('Album clear sucess')
  $('.content').empty()
}

const addAlbumSuccess = () => {
  console.log('Album add sucess')
}

const failure = (error) => {
  console.log('Album failure')
  console.error(error)
}

module.exports = {
  addAlbumSuccess,
  getAlbumsSuccess,
  clearAlbums,
  failure
}
