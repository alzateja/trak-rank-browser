'use strict'

const store = require('../store')
const albumEvents = require('../albums/events.js')

// Sign UP SUCCESS AND FAILURE MESSAGING ________________________
const signUpSuccess = (data) => {
  console.log('User sucessfully created:', data)
  $('#sign-up-api-success-alert').show()
  $('.signup-input-hides').hide()
  $('.signupclear').val('')
  console.log('Store looks like ', store)
}

const signUpFailure = (error) => {
  if (error.responseText === '{"email":["has already been taken"]}') {
    $('#sign-up-api-duplicate-account-alert').show()
    return
  }
  $('#sign-up-api-failure-alert').show()
  console.log('Store looks like ', store)
}

// RESET SIGNUP MODAL
const resetSignUpModal = function () {
  console.log('Resetting signup Modal')
  $('.signupmodalalert').hide()
  $('.signupclear').val('')
  $('.signup-input-hides').show()
  $('#signUpForm').modal('hide')
}

//  SIGN IN SUCCESS AND FAILURE MESSAGING ________________________

const signInSuccess = (data) => {
  console.log('signIn success ran, data is: ', data)
  store.user = data.user

  // Update Sign In modal
  $('#sign-in-api-success-alert').show()
  $('.signin-input-hides').hide()
  $('.signinclear').val('')

  // Show AI ,new game, sign out, change pass, and options
  signInShow()

  $('#display-current-user').text('Signed in as ' + data.user.email)
  albumEvents.onGetAlbums()
  console.log('Store looks like ', store)
}

const signInFailure = (error) => {
  console.error('signIn error ran, error is: ', error)
  console.log(error.statusText)

  if (error.statusText === 'error') {
    $('#sign-in-api-failure-alert').show()
    return
  }

  if (error.statusText === 'Unauthorized') {
    $('#sign-in-api-unknown-account-alert').show()
    return
  }
  // Catch all modal
  $('#sign-in-hell-if-i-know-failure-alert').show()
  console.log('Store looks like ', store)
}

// Reset Sign In Modal
const resetSignInModal = function () {
  console.log('Resetting signin Modal')
  $('.signinmodalalert').hide()
  $('.signin-input-hides').show()
  $('.signinclear').val('')
  $('#signInForm').modal('hide')
}

// Hide and show Sign In objects
const signInShow = function () {
  $('.signin-hide').hide()
  $('#launch-video').empty()
  $('.signin-show').show()
}

//  Change Password SUCCESS AND FAILURE MESSAGING ______________________________

const changePasswordSuccess = (data) => {
  console.log('Password was succesfully changed, data is: ', data)
  $('#change-pass-api-success-alert').show()
  $('.changepass-input-hides').hide()
  $('.passwordchangeclear').val('')
  console.log('Store looks like ', store)
}

const changePasswordFailure = (error) => {
  console.log('Password was not succesfully changed', error)

  if (error.statusText === 'error') {
    $('#change-pass-api-failure-alert').show()
    return
  }
  if (error.statusText === 'Bad Request') {
    $('#change-pass-api-incorrect-password-alert').show()
    return
  }
  console.log('Store looks like ', store)
}

const resetChangePasswordModal = function () {
  console.log('Resetting signin Modal')
  $('.changepassmodalalert').hide()
  $('.changepass-input-hides').show()
  $('.passwordchangeclear').val('')
  $('#changePasswordForm').modal('hide')
}

//  SIGN OUT SUCCESS AND FAILURE MESSAGING ______________________

const signOutSuccess = () => {
  console.log('signOut success ran, and nothing was returned')
  console.log('Store looks like ', store)

  store.user = null
  $('#display-current-user').text('')

  signOutShow()
  signOutLoadVideo()
  console.log('Store looks like ', store)
}

const signOutFailure = (error) => {
  console.error('signOut error ran, error is: ', error)
  $('#signOutForm').modal('show')
  $('#signout-api-failure-alert').show()
  console.log('Store looks like ', store)
}

const signOutShow = function () {
  $('.signin-hide').show()
  $('.signin-show').hide()
  $('#content').empty()
}

const signOutLoadVideo = function () {
  const array = store.videos
  const numOptions = store.videos.length
  console.log(array)
  console.log(numOptions)
  const random = Math.floor(Math.random() * (numOptions - 0 + 1)) + 0
  const video = array[random]
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
  resetSignUpModal,
  resetSignInModal,
  resetChangePasswordModal,
  signOutShow

}
