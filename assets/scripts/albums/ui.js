'use strict'

const showAlbumsTemplate = require('../templates/album-listing.handlebars')

const getAlbumsSuccess = (data) => {
  console.log('Album get sucess')
  console.log(data)
  let showAlbumsHtml = showAlbumsTemplate({ albums: data.albums })
  console.log(showAlbumsHtml)
  $('.content').append(showAlbumsHtml)
//  $('.remove-button').on('click', hideBook);
}

// const hideBook = (event) => {
//   event.preventDefault();
//   $("." + event.target.id ).hide()
//
// };

const clearAlbums = () => {
  console.log('Album clear sucess')
  $('.content').empty()
}

const failure = (error) => {
  console.log('Album failure')
  console.error(error)
}

module.exports = {
  getAlbumsSuccess,
  clearAlbums,
  failure
}
