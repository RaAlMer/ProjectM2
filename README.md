# ProjectM2

## Description

Social web page for people who are aware of the environment.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **posts list** - As a user I want to see all the posts available so that I can choose which ones I am more interested in
- **post create** - As a user I want to create a post so that I can contribute to help the environment
- **posts detail** - As a user I want to see the post details and help other people around the world 
- **post vote** - As a user I want to be able to vote to the posts so that the web page can be improved
- **post comment** - As a user I want to be able to comment the posts so that I can contribute with ideas and improvements
- **profile** - As a user I want to access my profile so that I can check my posts, comments and score
- **post edit/delete** - As a user I want to be able to edit or delete my posts and comments so that I can correct my mistakes
- **map** - As a user I want to see the location of every post so that I am able to help people near my location

## Backlog

User profile:
- see my score and other people score
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
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
- GET /events/:id
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend 
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)


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
createdAt: Date
editedAt: Date
```

Post model

```
user: ObjectId<User>
title: String
image: String
description: String
longitude: Number
latitude: Number
city: String
countr: String
level: String
contact: [ObjectId<LocalAuthorities>]
upVote: [ObjectId<User>]
downVote: [ObjectId<User>]
comments: [ObjectId<Comment>]
createdAt: Date
editedAt: Date
``` 

Comment model

```
user: ObjectId<User>
title: String
image: String
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

## Links

### Trello

[Link Trello board](https://trello.com/b/1qer5OLb/m2)

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](https://geogreen.herokuapp.com/)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)