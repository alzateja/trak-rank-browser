'use strict'
const config = require('../config.js')
const store = require('../store.js')

let getAlbums = function () {
  return $.ajax({
    url: config.apiOrigin + '/albums', // "http://book-json.herokuapp.com/books"
    method: 'GET'
  })
}

module.exports = {
  getAlbums
}
