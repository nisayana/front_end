# Baikal Travel Guide :ocean: :national_park: :sunrise_over_mountains:

Travel is always a good idea.

Features
* Users can sign up or sign in.
* Upon Sign in Users are taken to the Home page and gain access to their Profile
* User is able to see a list of destinations
* Users can add Destinations to their bucketlist
* Users can Review Destinations
* Users can Delete, Bucketlist Items and Reviews

### Tech Stack
This web app is built with the following:

Backend

* Ruby [2.6.1]
* Rails [~> 6.0.2] - MVC web framework used as an API
* Active Model Serializers [~> 0.10.0] - Serializing API routes to JSON
* PostgreSQL [>= 0.18, < 2.0] - Database

Front End

* Vanilla JavaScript [ES6]
* Custom CSS3 styling

Installation
Backend Installation:

* Clone [backend](https://github.com/nisayana/travel_backend) repo to local machine git clone <backend-repo-url>
* run bundle install to install required dependencies
* run rails db:create to create a database locally.
* run rails db:migrate to create tables into the database.
* run rails db:seed to create seed data.
* run rails s to run the server.

Frontend Installation:

* Clone this repo to your local machine git clone <this-repo-url>
* Ensure Baikal Travel Guide-API is running locally on http://localhost:3000/
* run open index.html on termial.
