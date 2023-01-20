const { app } = require("../app");
require("jest-sorted");
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
describe("GET /api/articles/:articles_id", () => {
  test("returns a status of 200 ", () => {
    return request(app)
      .get("/api/articles?article_id=3")
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
          expect(cmnt).toHaveProperty("created_at");
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
  test("Inserts a new comment to a specific article", () => {
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

  test("Returns an Error for non existing article_id", () => {
    const postartecle = [
      {
        username: "icellusedkars",
        body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ];
    const article_id = 999;
    return request(app)
      .post(`/api/articles/${article_id}/comments`)
      .send(postartecle)
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toEqual("Article not found");
      });
  });
});
describe("8. PATCH /api/articles/:article_id", () => {
  test("Returns partial update", () => {
    const article_id = 9;
    const incremnt = { inc_votes: -5 };
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send(incremnt)
      .expect(200)
      .then((result) => {
        result.body.forEach((item) => {
          expect(item).toHaveProperty("article_id");
          expect(item).toHaveProperty("title");
          expect(item).toHaveProperty("topic");
          expect(item).toHaveProperty("author");
          expect(item).toHaveProperty("body");
          expect(item).toHaveProperty("created_at");
          expect(item).toHaveProperty("votes");
          expect(item).toHaveProperty("article_img_url");
        });
        expect(result.body).toEqual([
          {
            article_id: 9,
            title: "They're not exactly dogs, are they?",
            topic: "mitch",
            author: "butter_bridge",
            body: "Well? Think about it.",
            created_at: "2020-06-06T09:10:00.000Z",
            votes: -5,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          },
        ]);
      });
  });
  test("Returns Error with 404 when the article id it does not exist", () => {
    const article_id = 50;
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
  test("Invalid endpoin", () => {
    const article_id = "Adel";
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
});
describe("9. GET /api/users", () => {
  test("Returns an array of objects, each object should have the following property", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((data) => {
        expect(data.body).toEqual([
          {
            username: "butter_bridge",
            name: "jonny",
            avatar_url:
              "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          },
          {
            username: "icellusedkars",
            name: "sam",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
          },
          {
            username: "rogersop",
            name: "paul",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
          },
          {
            username: "lurker",
            name: "do_nothing",
            avatar_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          },
        ]);
      });
  });
  test("Returns an array of objects, each object should have the following property", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((data) => {
        if (data.body.length > 0) {
          data.body.forEach((item) => {
            expect(item).toHaveProperty("username");
            expect(item).toHaveProperty("name");
            expect(item).toHaveProperty("avatar_url");
          });
        }
      });
  });
});

describe("10. GET /api/articles (queries)", () => {
  test("Returns An article response object with  an existing topic sorted in descending order", () => {
    const topic = "mitch";
    return request(app)
      .get(`/api/articles?topic=mitch&order=DESC&sortBy=article_id`)
      .expect(200)
      .then((data) => {
        expect(data.body.length).toBe(11);
        expect([data.body]).toBeSorted({ key: "article_id" });

        data.body.forEach((item) => {
          expect(item.topic).toBe("mitch");
        });
      });
  });
  test("it should return a 400 and Please sort by acceptable parameter messsage when invalid sort by ", () => {
    return request(app)
      .get(`/api/articles?topic=mitch&order=ASC&sortBy=body`)
      .expect(400)
      .then((data) => {
        expect(data.body.msg).toBe(
          "Please sort and oredr by acceptable parameters"
        );
      });
  });

  test("it should return a 400 and Please sort and oredr by acceptable parameters messsage when invalid order by ", () => {
    return request(app)
      .get(`/api/articles?topic=mitch&order=MKD&sortBy=body`)
      .expect(400)
      .then((data) => {
        expect(data.body.msg).toBe(
          "Please sort and oredr by acceptable parameters"
        );
      });
  });
  test("Returns articles filtred by topic and sorted by and ordered by the defult values", () => {
    const topic = "mitch";
    return request(app)
      .get(`/api/articles?topic=mitch`)
      .expect(200)

      .then((data) => {
        expect(data.body.length).toBe(11);
        expect([data.body]).toBeSorted({ key: "created_at" });

        data.body.forEach((topic) => {
          expect(topic.topic).toBe("mitch");
        });
      });
  });
  test("Returns Path not found if passing non existing topic", () => {
    const topic = "coding";
    return request(app)
      .get(`/api/articles?topic=${topic}`)
      .expect(200)
      .then((data) => {
        expect(data.body).toEqual([]);
      });
  });
});
test("Returns an array of all articles objects if no topic", () => {
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
      });
      expect(result.body[0].created_at).toBe("2020-11-03T09:12:00.000Z");
      expect(result.body[0].comment_count).toBe("2");
      expect(result.body[5].comment_count).toBe("11");
      expect(result.body[result.body.length - 1].created_at).toBe(
        "2020-01-07T14:08:00.000Z"
      );
    });
});

test("Returns a 404 err status when passing topic which doesn`t exist", () => {
  const topic = "coding";
  const sort_by = ["ASC", "DECS"];
  return request(app)
    .get(`/api/articles?topic=coding&order=DESC`)
    .expect(200)
    .then((data) => {
      // console.log(data);
      expect(data.body).toEqual([]);
    });
});
