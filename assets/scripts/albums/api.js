'use strict'
const config = require('../config.js')
let store = require('../store')

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

let getRatings = function () {
  console.log("get ratings")
  return $.ajax({
    url: config.apiOrigin + '/my-ratings/', // "http://book-json.herokuapp.com/books"
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getAlbums,
  addAlbum,
  getRatings
}