# NC News Seeding
- .env.development
Create a .env.development file in your project folder and add the followings:
PGDATABASE=nc_news
This connects your application to the main development database


- .env.test
Create a .env.test file in the same directory and add
PGDATABASE=nc_news_test
This ensures your tests run against a separate test database called nc_news_test, so your development data remains unaffected.

