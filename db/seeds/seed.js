const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate } = require("./utils");
const { createRef } = require("./utils");
const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics`);
    })
    .then(() => {
      return db.query(`CREATE TABLE topics(
        description CHARACTER VARYING(250),
        slug VARCHAR(40) PRIMARY KEY,
      img_url VARCHAR(1000));`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users(
      username VARCHAR(40) PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      avatar_url VARCHAR(1000)  );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(250) NOT NULL,
        topic VARCHAR(40) REFERENCES topics(slug),
        author CHARACTER VARYING(50) REFERENCES users(username),
        body TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000));`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments(
        comment_id SERIAL PRIMARY KEY,
        article_id INT REFERENCES articles(article_id),
        body TEXT,
        votes INT DEFAULT 0,
        author VARCHAR(40) REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
    })
    .then(() => {
      const formattedTopics = topicData.map(
        ({ description, slug, img_url }) => [description, slug, img_url]
      );

      const insertTopicsQuery = format(
        `INSERT INTO topics (description, slug, img_url) VALUES %L RETURNING *;`,
        formattedTopics
      );

      return db.query(insertTopicsQuery);
    })
    .then(() => {
      const formattedUsers = userData.map(({ username, name, avatar_url }) => [
        username,
        name,
        avatar_url,
      ]);
      const insertUsersQuery = format(
        `INSERT INTO users(username, name, avatar_url) VALUES %L RETURNING *;`,
        formattedUsers
      );
      return db.query(insertUsersQuery);
    })
    .then(() => {
      const formattedArticles = articleData
        .map(convertTimestampToDate)
        .map(
          ({
            title,
            topic,
            author,
            body,
            created_at,
            votes,
            article_img_url,
          }) => [title, topic, author, body, created_at, votes, article_img_url]
        );
      const insertArticlesQuery = format(
        `INSERT INTO articles(
            title,
            topic,
            author,
            body,
            created_at,
            votes,
            article_img_url) VALUES %L RETURNING *;`,
        formattedArticles
      );

      return db.query(insertArticlesQuery);
    })
    .then((articleInsertResult) => {
      const articlRef = createRef(
        articleInsertResult.rows,
        "title",
        "article_id"
      );
      const formattedComments = commentData
        .map(convertTimestampToDate)
        .map((comment) => {
          return [
            articlRef[comment.belongs_to],
            comment.body,
            comment.votes,
            comment.author,
            comment.created_at,
          ];
        });
      const insertCommentQuery = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L RETURNING *;`,
        formattedComments
      );
      return db.query(insertCommentQuery);
    });
};
module.exports = seed;
