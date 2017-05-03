'use strict'

let store = require('../store')
const albumEvents = require('../albums/events.js')
const indexFile = require('../index')

// Sign UP SUCCESS AND FAILURE MESSAGING ________________________
const signUpSuccess = (data) => {
  console.log(data)
  $('#signUpForm').modal('hide')
  $('#signUpPlayerPasswordConfirm').val('')
  $('#signUpPlayerPassword').val('')
  $('#signUpPlayerEmail').val('')

  $('#sign-up-failure-alert').hide()
}

const signUpFailure = (error) => {
  console.error(error)
  $('#sign-up-failure-alert').show()
}

//  SIGN IN SUCCESS AND FAILURE MESSAGING ________________________

const signInSuccess = (data) => {
console.log(store)
console.log(data);
  console.log('signIn success ran, data is: ', data)
  store.user = data.user
  // Hide Modal
  $('#signInForm').modal('hide')
  // Clear fields
  $('.signup-input').val('')
  // Show AI ,new game, sign out, change pass, and options
  $('#sign-in-failure-alert').hide()
  $('.signin-hide').hide()
  $('#signupbut').hide()
  $('#signinbut').hide()
  $('#launch-video').empty()
  // Show content
  $('.signin-show').show()
// New report
  $('#launch-video').empty()
  $('#display-current-user').text('Signed in as ' + data.user.email)
  albumEvents.onGetAlbums()
}

const signInFailure = (error) => {
  console.error('signIn error ran, error is: ', error)
  $('#sign-in-failure-alert').show()
}

//  SIGN OUT SUCCESS AND FAILURE MESSAGING ______________________

const signOutSuccess = () => {
  console.log('signOut success ran, and nothing was returned')

// Hide elements
  console.log(store.user)
  $('.signin-hide').show()

  store.user = null
  console.log(store.user)
  $('#display-current-user').text('')
  $('.signin-hide').show()
  $('.signin-show').hide()
  $('#content').empty()
  let array = store.videos
  signOutLoadVideo(array)
}

const signOutFailure = (error) => {
  console.error('signOut error ran, error is: ', error)
}

//  Change Password SUCCESS AND FAILURE MESSAGING ______________________________

const changePasswordSuccess = (data) => {
  console.log('Password was succesfully changed')
  $('#changePasswordForm').modal('hide')
  $('#changePassNew').val('')
  $('#changePassOld').val('')
}

const changePasswordFailure = (error) => {
  console.log('Password was not succesfully changed', error)
}

const signInClose = function () {
  $('#signInPlayerPassword').val('')
  $('#signInPlayerEmail').val('')
}

const signOutLoadVideo = function (array) {
  console.log(store)
  let options = array.length
  let random = Math.floor(Math.random() * (options - 0 + 1)) + 0
  let video = array[random]
  $('#launch-video').append('<iframe class="embed-responsive-item" src="' + video + '&autoplay=1"></iframe>')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  changePasswordFailure,
  changePasswordSuccess,
  signInClose
}
