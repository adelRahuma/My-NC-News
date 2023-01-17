const { app } = require("../app");
const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});
describe("get api", () => {
  test("", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        const result = res.body;
        expect(result.msg).toBe("No content found");
      });
  });
});
describe("app", () => {
  test("Returns Error with 404", () => {
    return request(app)
      .get("/not-a-path")
      .expect(404)
      .then((result) => {
        const resl = JSON.parse(result.text);
        const { msg } = resl;
        expect(msg).toBe("Path not found");
      });
  });
});
describe("GET api/topics", () => {
  test("Returns an array of topic objects, each of which should have the following properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((result) => {
        expect(result.body.length).toBe(3);
      });
  });

  test("Returns Error with 404", () => {
    return request(app).get("/api/ty").expect(404);
  });

  test("responds with 200 and shows all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((result) => {
        result.body.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
        expect(result.body[0]).toEqual({
          slug: "mitch",
          description: "The man, the Mitch, the legend",
        });
      });
  });
});

describe("GET /api/articles", () => {
  test("Returns an array of articles objects, each of which should have the following properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((result) => {
        expect(result.body).toHaveLength(12);
        result.body.forEach((topic) => {
          expect(topic).toHaveProperty("author");
          expect(topic).toHaveProperty("title");
          expect(topic).toHaveProperty("article_id");
          expect(topic).toHaveProperty("created_at");
          expect(topic).toHaveProperty("votes");
          expect(topic).toHaveProperty("article_img_url");
          expect(topic).toHaveProperty("comment_count");
        });
        expect(result.body[0].created_at).toBe("2020-11-03T09:12:00.000Z");
        expect(result.body[0].comment_count).toBe("2");
        expect(result.body[5].comment_count).toBe("11");
        expect(result.body[result.body.length - 1].created_at).toBe(
          "2020-01-07T14:08:00.000Z"
        );
      });
  });
});
describe.only("GET /api/articles/:articles_id", () => {
  test.only("returns a status of 200 ", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then((result) => {
        if (result.length > 0) {
          expect(result.body).toHaveProperty("author");
          expect(result.body).toHaveProperty("title");
          expect(result.body).toHaveProperty("article_id");
          expect(result.body).toHaveProperty("body");
          expect(result.body).toHaveProperty("topic");
          expect(result.body).toHaveProperty("created_at");
          expect(result.body).toHaveProperty("votes");
          expect(result.body).toHaveProperty("article_img_url");
        }
      });
  });
});
describe("/api/articles/:article_id/comments", () => {
  test("an array of comments for the given article_id of which each comment", () => {
    const article_id = 3;
    return request(app)
      .get(`/api/articles/${article_id}/commentS`)
      .expect(200)
      .then((result) => {
        result.body.forEach((cmnt) => {
          expect(cmnt).toHaveProperty("comment_id");
          expect(cmnt).toHaveProperty("body");
          expect(cmnt).toHaveProperty("article_id");
          expect(comment).toHaveProperty("created_at");
          expect(cmnt).toHaveProperty("votes");
          expect(cmnt).toHaveProperty("author");
        });
        expect(result.body).toEqual([
          {
            comment_id: 11,
            body: "Ambidextrous marsupial",
            article_id: 3,
            author: "icellusedkars",
            votes: 0,
            created_at: "2020-09-19T23:10:00.000Z",
          },
          {
            comment_id: 10,
            body: "git push origin master",
            article_id: 3,
            author: "icellusedkars",
            votes: 0,
            created_at: "2020-06-20T07:24:00.000Z",
          },
        ]);
      });
  });
});
describe("POST /api/articles/:article_id/comments", () => {
  test("", () => {
    const postartecle = [
      {
        username: "icellusedkars",
        body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ];
    const article_id = 9;
    return request(app)
      .post(`/api/articles/${article_id}/comments`)
      .send(postartecle)
      .expect(201)
      .then((result) => {
        expect(result.body).toEqual([
          {
            comment_id: 19,
            body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            article_id: 9,
            author: "icellusedkars",
            votes: 0,
            created_at: "2023-01-11T00:00:00.000Z",
          },
        ]);
      });
  });
});
