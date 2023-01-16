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
describe("GET api/topics", () => {
  test("Returns an array of topic objects, each of which should have the following properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((result) => {
        expect(result.body.length).toBe(3);
      });
  });

  test("responds with 200 and shows all topics", () => {
    const formattedObject = {};
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
