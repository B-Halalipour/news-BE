# NC News Seeding

- .env.development
  Create a .env.development file in your project folder and add the followings:
  PGDATABASE=nc_news
  This connects your application to the main development database

- .env.test
  Create a .env.test file in the same directory and add
  PGDATABASE=nc_news_test
  This ensures your tests run against a separate test database called nc_news_test, so your development data remains unaffected.

# behnoud-news-api

## Project Overview

behnoud-news-api is a backend API for a news platform, built with Node.js, Express, and PostgreSQL. It serves articles, comments, users, and more through RESTful endpoints, including features like comment counts on articles.

---

## Hosted Version

The API is hosted online and accessible at:  
[https://behnoud-news-api.onrender.com](https://behnoud-news-api.onrender.com)

---

## Environment Setup

### `.env.development`

Create a `.env.development` file in your project root with the following content:

This connects your app to the local development database.

### `.env.test`

Create a `.env.test` file in your project root with:

This configures the app to use a separate test database during automated testing, preventing interference with your development data.

### `.env.production`

For production, create a `.env.production` file with your production database URL from Supabase:

DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production

---

## Setup Instructions

### Clone the repository

git clone https://github.com/your-username/behnoud-news-api.git
cd behnoud-news-api

### Install dependencies:

`npm install`

### Set up local databases

Create your local databases (nc_news and nc_news_test) in PostgreSQL, then run:

`npm run setup-dbs`

### Seed the development database:

`npm run seed-dev`

### Run the test suite with:

`npm test`

### Running the API locally

Start the development server:

`npm run dev`

This project is deployed on Render with the database hosted on Supabase. Environment variables for production are set via Render’s dashboard.

Feel free to explore the API and contribute! For any questions or issues, please open an issue on GitHub.
