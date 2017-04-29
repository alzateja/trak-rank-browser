'use strict'
const config = require('../config.js')
const store = require('../store.js')

let getAlbums = function () {
  return $.ajax({
    url: config.apiOrigin + '/albums', // "http://book-json.herokuapp.com/books"
    method: 'GET'
  })
}

let addAlbum = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/albums',
    method: 'POST',
    data
  })
}

module.exports = {
  getAlbums,
  addAlbum
}
