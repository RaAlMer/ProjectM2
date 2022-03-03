# GeoGreen

## Description

Social web page for people who are aware of the environment.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up / log in** - As a user I want to sign up / log in on the webpage so that I can see all the events that I could attend
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **profile** - As a user I want to access my profile so that I can check my information and score
- **edit-profile** - As a user I want to edit my profile so that I can add some information about myself
- **posts list** - As a user I want to see all the posts available so that I can choose which ones I am more interested in
- **post create** - As a user I want to create a post so that I can contribute to help the environment
- **posts detail** - As a user I want to see the post details and help other people around the world 
- **post vote** - As a user I want to be able to vote to the posts so that the web page can be improved
- **post comment** - As a user I want to be able to comment the posts so that I can contribute with ideas and improvements
- **post edit/delete** - As a user I want to be able to edit or delete my posts and comments so that I can correct my mistakes
- **map** - As a user I want to see the location of every post so that I am able to help people near my location
- **reset-password** - As a user I want to be able to reset the password of my account

## Backlog

User profile:
- list of posts created by the user
- list posts the user has completed

Posts:
- add filters to posts

Groups:
- add groups so people can join them

Local authority's page:
- add page to check the contact from every local authority in the world
- check their website, contact, location

Desktop version:
- add a desktop version of the application

## ROUTES:

- GET / 
  - renders the homepage
- GET /sign-log
  - redirects to / if user logged in
  - renders the signup/login form
- POST /signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
    - repeatPassword
- POST /login
  - redirects to / if user logged in
  - body:
    - email
    - password
- GET /logout
  - redirects to /
  - body: (empty)
- GET /profile/:id
  - renders the profile page
- GET /editProfile/:id
  - renders the edit profile page
- PUT /editProfile/:id
  - redirects to /login if user is anonymous
  - body: 
    - username
    - image
    - country
    - gender
- GET /posts/create
  - redirects to /login if user is anonymous
  - renders the post create page
- POST /posts/create
  - redirects to /login if user is anonymous
  - body:
    - title
    - images
    - description
    - city
    - country
    - level
    - longitude
    - latitude
    - user
- GET /posts/all
  - renders the post list page
- GET /posts/edit/:id
  - redirects to /login if user is anonymous
  - renders the post edit page
- PUT /posts/edit/:id
  - redirects to /login if user is anonymous
  - body:
    - title
    - status
    - images
    - description
    - city
    - country
    - level
    - longitude
    - latitude
    - user
- GET /posts/updvote/:id
  - redirects to /login if user is anonymous
  - upvotes a post if it's not already upvoted
- GET /posts/downvote/:id
  - redirects to /login if user is anonymous
  - downvotes a post if it's not already downvoted
- GET /posts/postDetail/:id
  - redirects to /login if user is anonymous
  - renders the post detail page
- DELETE /posts/:id
  - redirects to /login if user is anonymous
  - deletes the post
- POST /comment/:id
  - redirects to /login if user is anonymous
  - body:
    - title
    - image
    - description
    - user
- GET /map
  - renders the map page
- GET /map/:id
  - renders the map page centered in id coordinates
- GET /password-reset
  - renders the reset password page
- POST /password-reset
  - body:
    - email
- GET /password-reset/:id/:token
  - renders the reset password page where you can change the password using a token
- POST /password-reset/:id/:token
  - body:
    - password


## Models

User model
 
```
username: String
email: String
password: String
score: Number
img: String
country: String
gender: String
comments: [ObjectId<Comment>]
posts: [ObjectId<Post>]
createdAt: Date
editedAt: Date
```

Post model

```
user: ObjectId<User>
title: String
image: [String]
description: String
latitude: Number
longitude: Number
city: String
countr: String
level: String
contact: [ObjectId<LocalAuthorities>]
upVote: [ObjectId<User>]
downVote: [ObjectId<User>]
comments: [ObjectId<Comment>]
status: String
createdAt: Date
editedAt: Date
``` 

Comment model

```
user: ObjectId<User>
title: String
image: [String]
description: String
upVote: [ObjectId<User>]
downVote: [ObjectId<User>]
createdAt: Date
editedAt: Date
``` 

localAuthorities model

```
name: String
telephone: Number
email: String
address: String
city: String
country: String
link: String
``` 

Token model

```
userId: ObjectId<User>
token: String
createdAt: Date
``` 

## Links

### Trello

[Link Trello board](https://trello.com/b/1qer5OLb/m2)

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/RaAlMer/ProjectM2)

[Deploy Link](https://geogreen.herokuapp.com/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/e/2PACX-1vQP_WF2DXXpCIEUj6Usa54g9nQW06xNCn2E4rV-VZaAbtdhuM_R48cvhnx9tzwBUTiR2PApdOVEfOQA/pub?start=false&loop=false&delayms=60000)