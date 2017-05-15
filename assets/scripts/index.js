'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events.js')
const albumEvents = require('./albums/events.js')
const ratingsEvents = require('./ratings/events.js')
let store = require('./store')

const videos = [
  'https://www.youtube.com/embed/pKDVUu0aePM?start=0' // Pony Bradshaw
  , 'https://www.youtube.com/embed/hi4pzKvuEQM?start=0' // Chet Faker
  , 'https://www.youtube.com/embed/FjafzdCO0-o?start=0' // Julian Baker
  , 'https://www.youtube.com/embed/tvTRZJ-4EyI?start=0' // Kendrick Lamar
  , 'https://www.youtube.com/embed/sI66hcu9fIs?start=0' // David Bowie
  , 'https://www.youtube.com/embed/jenWdylTtzs?start=0' // Beatles
  , 'https://www.youtube.com/embed/SKnbFpdGKog?start=0' // Velvet Underground
  , 'https://www.youtube.com/embed/Eh44QPT1mPE?start=106' // Neil Young
  , 'https://www.youtube.com/embed/uiLKT5rPHBA?start=0' // Led Zeppelin
  , 'https://www.youtube.com/embed/HTDjD_UdJYs?start=68' // Howling wolf
  , 'https://www.youtube.com/embed/hMkdhVQMBHY?start=0' // Jimi Hendrix
  , 'https://www.youtube.com/embed/yoYZf-lBF_U?start=0' // Mobb Deep
  , 'https://www.youtube.com/embed/-OqrcUvrbRY?start=0' // Anderson Paak
  , 'https://www.youtube.com/embed/CFjMeOnqAPI?start=0' // GaryClark
  , 'https://www.youtube.com/embed/HGy9i8vvCxk?start=9' // Aloe Blacc
  , 'https://www.youtube.com/embed/OeP4FFr88SQ?start=71' // Bob Dylan
  , 'https://www.youtube.com/embed/FM7MFYoylVs?start=0' // Chainsmokers
  , 'https://www.youtube.com/embed/vO2Su3erRIA?start=0' // Tribe Called Quest
  , 'https://www.youtube.com/embed/eu0KsZ_MVBc?start=67' // Avalanche
  , 'https://www.youtube.com/embed/MTrKkqE9p1o?start=30' // Leon Bridges
  , 'https://www.youtube.com/embed/0yq-Fw7C26Y?start=14' // FleetwoodMac
  , 'https://www.youtube.com/embed/0y8Q2PATVyI?start=0' // Wilson Pickett
  , 'https://www.youtube.com/embed/rTVjnBo96Ug?start=0' // Otis Redding
  , 'https://www.youtube.com/embed/jo-5MI9-yjU?start=0' // Marvin Gaye
]

const initialHide = function () {
  $('.alert').hide()
  $('.signin-show').hide()
}

const storeVideos = function () {
  store.videos = videos
  // // console.log(store)
}

const onLoadVideo = function () {
  const array = store.videos
  const numOptions = store.videos.length - 1
  // // console.log(array)
  // // console.log(numOptions)
  const random = Math.floor(Math.random() * (numOptions - 0 + 1)) + 0
  const video = array[random]
  // // console.log(random)
  $('#launch-video').append('<iframe class="embed-responsive-item" src="' + video + '&autoplay=1"></iframe>')
}

$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  albumEvents.addHandlers()
  ratingsEvents.addHandlers()
  initialHide()
  storeVideos()
  onLoadVideo()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
