const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");
const articles = require("../db/data/test-data/articles");
/* Set up your beforeEach & afterAll functions here */

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
describe("GET /api/topics", () => {
  test("200: Responds with an object with the key of topics and the value of an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        topics.forEach((topic) => {
          expect(typeof topic).toBe("object");
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
        expect(topics.length).toBeGreaterThan(0);
      });
  });

  describe("GET /api/articles", () => {
    test("200: Responds with an object with the key of articles and the value of an array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          articles.forEach((article) => {
            expect(typeof article.author).toBe("string");
            expect(typeof article.title).toBe("string");
            expect(typeof article.article_id).toBe("number");
            expect(typeof article.topic).toBe("string");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
            expect(typeof article.comment_count).toBe("number");
          });
          expect(articles.length).not.toBe(0);
        });
    });
  });
  describe("GET /api/articles/:article_id", () => {
    test("200: Responds with an object with the key of article and the value of an article object", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
        });
    });
    test("400: responds with an error if id is not valid", () => {
      return request(app)
        .get("/api/articles/notanum")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("bad request");
        });
    });
    test("404: responds with custom error message when article not found", () => {
      return request(app)
        .get("/api/articles/9999999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("not found");
        });
    });
  });
  describe("GET /api/articles/:article_id/comments", () => {
    test("Responds with an object with the key of comments and the value of an array of comments for the given article_id", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(Array.isArray(comments)).toBe(true);
          expect(comments.length).toBeGreaterThanOrEqual(0);
          comments.forEach((comment) => {
            expect(typeof comment.comment_id).toBe("number");
            expect(typeof comment.votes).toBe("number");
            expect(typeof comment.created_at).toBe("string");
            expect(typeof comment.author).toBe("string");
            expect(typeof comment.body).toBe("string");
            expect(comment.article_id).toBe(1);
          });
          for (let i = 0; i < comments.length - 1; i++) {
            expect(new Date(comments[i].created_at)).toBeGreaterThanOrEqual(
              new Date(comments[i + 1].created_at)
            );
          }
        });
    });
    test("400: responds with error for invalid article_id", () => {
      return request(app)
        .get("/api/articles/notanumber/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("bad request");
        });
    });
    test("404: responds with custom error message when article not found", () => {
      return request(app)
        .get("/api/articles/9999999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("not found");
        });
    });
  });

  describe("GET /api/users", () => {
    test("200: Responds with an object with the key of users and the value of an array of objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          users.forEach((user) => {
            expect(typeof user.username).toBe("string");
            expect(typeof user.name).toBe("string");
            expect(typeof user.avatar_url).toBe("string");
          });
          expect(users.length).not.toBe(0);
        });
    });
  });
  describe("POST /api/articles/:article_id/comments", () => {
    test("201: posts a comment and returns it", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({
          username: "butter_bridge",
          body: "Great article!",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toMatchObject({
            author: "butter_bridge",
            body: "Great article!",
            article_id: 1,
          });
        });
    });

    test("400: missing fields", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "butter_bridge" })
        .expect(400);
    });

    test("400: invalid article_id", () => {
      return request(app)
        .post("/api/articles/not-a-number/comments")
        .send({
          username: "butter_bridge",
          body: "Nice",
        })
        .expect(400);
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    test("200: successfully updates the vote count", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 10 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toHaveProperty("votes", expect.any(Number));
        });
    });

    test("400: invalid article_id", () => {
      return request(app)
        .patch("/api/articles/not-a-number")
        .send({ inc_votes: 1 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("bad request");
        });
    });

    test("400: missing inc_votes in body", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid or missing inc_votes");
        });
    });

    test("404: article_id not found", () => {
      return request(app)
        .patch("/api/articles/9999")
        .send({ inc_votes: 5 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article not found");
        });
    });
  });
  describe("DELETE /api/comments/:comment_id", () => {
    test("204: successfully deletes a comment", () => {
      return request(app).delete("/api/comments/1").expect(204);
    });

    test("404: comment not found", () => {
      return request(app)
        .delete("/api/comments/999999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Comment not found");
        });
    });

    test("400: invalid comment_id", () => {
      return request(app)
        .delete("/api/comments/notanumber")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("bad request");
        });
    });
  });
});
