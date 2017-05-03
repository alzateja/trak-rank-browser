'use strict'

const resetAlbumSuccess = (data) => {
  console.log('Deleted the entry')
  console.log(data)
  resetRatingModal()
}

const resetRatingModal = () => {
  console.log('Resetting the Modal')
  $('.ratingoutput').text('')
  $('.ratingoutput').val('')
  $('#commentDisplay').val('')
  $('#album-status-select').text('Album Status')
  $('#album-rating-select').text('Rating')
  $('#viewAlbumForm').modal('hide')
}

const createAlbumRatingSuccess = () => {
  console.log('Created an album rating')
  resetRatingModal()
}

const updateAlbumRatingSuccess = () => {
  console.log('Updated an album rating')
  resetRatingModal()
}

module.exports = {
  resetAlbumSuccess,
  resetRatingModal,
  createAlbumRatingSuccess,
  updateAlbumRatingSuccess
}
