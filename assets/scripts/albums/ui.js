'use strict'
const modalEvents = require('../modal-load/events.js')
const store = require('../store')
const showAlbumsTemplate = require('../templates/album-listing.handlebars')

// ADD AN ALBUM
const addAlbumSuccess = (data) => {
  console.log('Album add success', data)
  $('#add-album-api-success-alert').show()
  $('.add-album-input-hides').hide()
  $('#createalbumsubmit').hide()
}

const addAlbumFailure = (error) => {
  console.log('Album failure')
  console.error(error)

  if (error.statusText === 'error') {
    $('#add-album-api-failure-alert').show()
    return
  }
}

const resetAddAlbumModal = () => {
  console.log('Resetting the Add Album Modal')
  $('.add-album-modal-alert').hide()
  $('.add-album-input-hides').show()
  $('.album-input').val('')
  $('#createalbumsubmit').show()
  $('#addAlbumForm').modal('hide')
}

// GET ALL ALBUMS
const getAlbumsSuccess = (data) => {
  console.log(data)
  store.albums = data.albums
  console.log(store)
  renderAlbums(0)
}

const getAlbumsFailure = (error) => {
  console.log('Unimaginable failure', error)
}

// GET RATINGS
const getRatingsSuccess = (data) => {
  console.log('Get All Ratings success! You have ratings:' + data.user_ratings.length)
  console.log('Your data looks like ', data)
  store.user_ratings = data.user_ratings
}

const getRatingsFailure = (error) => {
  console.log('Get All Ratings was a failure', error)
}

// CALCULATE STATS
const calculateStats = function () {
  // console.log(store.albums)
  const totalAlbums = store.albums.length
  let completeStat = 0
  let progressStat = 0
  let notStartedStat = 0
  let ratingSum = 0
  let ratingCount = 0

// If no user_ratings then Not Started equals ALbums
  if (store.user_ratings.length === 0) {
    notStartedStat === totalAlbums
  } else {
    // Else loop through user ratings
    for (let i = 0; i < store.user_ratings.length; i++) {
      // If current rating is completed Increment the completed count
      if (store.user_ratings[i].status === 'Completed') {
        completeStat++
      }
      // If current rating is in Progress Increment the in Progress count
      if (store.user_ratings[i].status === 'In progress') {
        progressStat++
      }
      // If user rating is greater than 0 save rating into the sum
      if (store.user_ratings[i].ratings > 0) {
        ratingSum += store.user_ratings[i].ratings
        ratingCount++
      }
    }
  }
    // Finish Calculating Stats
  notStartedStat = totalAlbums - progressStat - completeStat
  const avg = (ratingSum / ratingCount).toFixed(2)

    // Console log counts
  console.log('Total Albums ' + totalAlbums)
  console.log('Complete ' + completeStat)
  console.log('In Progress ' + progressStat)
  console.log('Not Started ' + notStartedStat)
  console.log(store.user_ratings)
  console.log(avg)

    // Update Modals
  $('#album-count').text(totalAlbums)
  $('#album-completed').text(completeStat)
  $('#album-in-progress').text(progressStat)
  $('#album-not-started').text(notStartedStat)
  if (avg > 0) {
    $('#album-avg-ratings').text(avg)
  }
  else {
    $('#album-avg-ratings').text('No ratings on file.')
  }
}

const resetUserStatsModal = () => {
  console.log('Resetting the User StatsModal')
  $('.user-stat-display').text('')
  $('#userStatsForm').modal('hide')
}

// RENDERING OF ALBUMS PAGE

const renderAlbums = (start) => {
  // Clear Contents
  clearContent()
  //  Define Variables
  let showPerPage = 50
  let end = start + (showPerPage - 1)
  let pages = Math.ceil(store.albums.length / showPerPage)
  let currentPage = (start / showPerPage) + 1
  let renderCounter = 0
  let temp = []
// Console log current Page
  console.log('current page:' + currentPage)

// Generate page Navigation
  generatePageNav(pages, currentPage)

// Check to see that end does not exceed total albums count
  if (end > store.albums.length) {
    end = store.albums.length - 1
  }

// Render Loop for Albums

  for (let i = start; i <= end; i++) {
    // if (renderCounter % 3 === 0 || renderCounter === 0) {
    //   $('.content').append('<div class="row">')
    // }
    temp.push(store.albums[i])
    renderCounter++

    if (renderCounter === 3 || i === end) {
      $('.content').append(showAlbumsTemplate({albums: temp}))
      temp = []
      renderCounter = 0
    }
  }
  $('.rate-album').on('click', modalEvents.onViewAlbumDetail)
}

// GENERATE PAGE NAV
const generatePageNav = function (needed, current) {
// Empty the page navigation bar
  $('#page-lister').empty()

// Complete the page navigation
  if (current > 1) {
    $('#page-lister').append('<li id="prev-page"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>')
  }
  for (let i = 1; i <= needed; i++) {
    $('#page-lister').append('<li id ="page-' + i + '"><a href="#" >' + i + '<span class="sr-only">(current)</span></a></li>')
    $('#page-' + i).on('click', selectPage)
  }
  if (current !== needed) {
    $('#page-lister').append('<li id="next-page"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>')
  }

  // Add active clase and lister for the
  $('#page-' + current).addClass('active')

  // Define functions to trigger click event
  const setPreviousPage = function () {
    $('#page-' + (current - 1)).trigger('click')
  }
  const setNextPage = function () {
    $('#page-' + (current + 1)).trigger('click')
  }

// Add click handlers to the previous page
  $('#prev-page').on('click', setPreviousPage)
  $('#next-page').on('click', setNextPage)
}

// SELECT THE PAGE
const selectPage = function (event) {
  event.preventDefault()
  let showPerPage = 50
  const num = event.currentTarget.id.replace('page-', '')
  let start = (num - 1) * showPerPage
  console.log('Rendering Albums From' + start)
  renderAlbums(start)
}

// Clear Screen
const clearContent = () => {
  console.log('Clear Album Content Display Screen')
  $('#content').empty()
}

module.exports = {
  addAlbumFailure,
  addAlbumSuccess,
  resetAddAlbumModal,
  getAlbumsSuccess,
  getAlbumsFailure,
  getRatingsSuccess,
  getRatingsFailure,
  calculateStats,
  resetUserStatsModal,
  renderAlbums
}
