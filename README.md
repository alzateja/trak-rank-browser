[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)


# Full Stack Project Practice

## Project Idea

What is your project idea?  How did you come up with it? Why? Who would use it?

I have a project idea is an app that works similar to the wine app Delectable.  It allows for users to
have a catalog of albums and allow them to rate songs and add comments to albums. My baseline data
will based on Rolling Stones 500 Greatest albums of all time.


## How does it work?
A user creates an account and gets access to all the albums in the database.  They are then able to select
individual albums and rate them.  They can update the ratings, reset (delete) them.
Additionally, they can add new albums and view stats.


## Write between 3-5 user stories

* As a user, I want an intuitive application that is easy to navigate
* As a user, I want a system where I can easily update rating information on albums
* As a develope, I want to design a flexible system and framework that can be leverage and our
used outside of the initial use case

## Plan your tables and columns

What tables will you need? What will the columns on the table be?

Album {
Tracks: [track1:, track2]  ,
Artist: ,
Year: ,
Rating (user defined): ,
Rating (calculated): ,
Comments: ,
Album_ID: ,
Genre:
}


Track {
title: ,
length: ,
rating: ,
comments:
}

User {
Email:
Password: ,
Name:
}

## Create an ERD (entity relationship diagram)

These are the diagrams that show how your tables are related to one another.
(one to many, many to many, ect).

###Inital ERD
See ERD_diagram.png

###Revised Designed
See V2_ERD_diagram.png


## Routing

What routes will you need to be able to make the proper request to your API?

3 routes :
1) user-auth
2) Albums
3) Ratings

## 3rd Party APIs

Do you plan to use any, if so what are they?

No third party APIs were used.

## Wireframes

Please create a wireframe of your planned front end.

###Sign-In
See Sign_In.png


###Album info
See Album_screen.png


## Timetable

Write a basic timetable for yourself, you don't have to stick to it but it
helps to go in with a plan.

* April 24 - Plan out my code
* April 26 - Design API and Basic Front End
* April 28 - AJAX functionality
* May 1 - Javascript finalized
* May 2 - HTML and CSS finalized. Testing
* May 3 - Tentative Presentation

## Link to Live application

https://alzateja.github.io/trak-rank-browser/

## Link to Rails API github

https://github.com/alzateja/trak-rank-rails-api

## Dependencies

Install with `npm install`.

-   [Webpack](https://webpack.github.io)
-   [Bootstrap](http://getbootstrap.com)
-   [Handlebars.js](http://handlebarsjs.com)

At the beginning of each cohort, update the versions in
[`package.json`](package.json) by replace all versions with a glob (`*`) and
running `npm update --save && npm update --save-dev`. You may wish to test these
changes by deleting the `node_modules` directory and running `npm install`.
Fix any conflicts.

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
