'use strict'

let store = require('../store')

const getOneAlbumSuccess = (data) => {
  console.log('Single Album get success')
  console.log(data.album)
  store.album = data.album
  $('#viewAlbumForm').modal('toggle')
  $('#albumIDDisplay').text(data.album.id)
  $('#rankingDisplay').text(data.album.ranking)
  $('#artistDisplay').text(data.album.artist)
  $('#albumDisplay').text(data.album.album)
  $('#yearDisplay').text(data.album.year)
  $('#formImage').html('<img src="' + data.album.image + '" class="img-responsive">')
}

const getAlbumRatingInfoSuccess = (data) => {
  store.user_ratings = null

  if (data.user_ratings.length === 0) {
    console.log('No data found')
    return
  }
  store.user_ratings = data.user_ratings
  $('#commentDisplay').text(data.user_ratings[0].comment)
  $('#statusDisplay').text(data.user_ratings[0].status)
  $('#ratingDisplay').text(data.user_ratings[0].ratings)
  $('#rating-reference').text(data.user_ratings[0].id)
}

module.exports = {
  getAlbumRatingInfoSuccess,
  getOneAlbumSuccess
}
