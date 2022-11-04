const request = require("supertest")

const { createApp } = require("../../app")
const { AppDataSource } = require("../models/datasource")
const post = require("../entities/posts");

const testId = "65a17606-b9e0-474d-8d7a-a4a45d2c7786";
const weather = 'sunny'
const testTitle = "test title";
const testContent = "test content"
const testPassword = "$2b$12$LLKwvLF.mLIioVrHwG8LiOvmgGKQXWaPOcLJClWTVAgRQXh1BK4yG"

describe("post", () => {
    let app;
    beforeAll(async () => {
        app = createApp();
        await AppDataSource.initialize();
        await AppDataSource.query(
            `
            INSERT INTO post (id,title, content, password, weather)
            VALUES('${testId}', '${testTitle}', '${testContent}', '${testPassword}', '${weather}')
            `
        )
    });

    afterAll(async () => {
        await AppDataSource.query(`TRUNCATE post`)
        await AppDataSource.destroy();
    });

    test("SUCCESS: create post", async () => {
        await request(app)
            .post("/post")
            .send({
                title: "test",
                content: "test",
                password:"test1234"
            })
            .expect(201)
            .expect({
                message: "게시글을 등록하였습니다.",
                statusCode: 201
            })
    });

    test("FAIL: create post", async () => {
        await request(app)
            .post("/post")
            .send({
                title: "testaaasdfsdfsadfsdfs",
                content: "test",
                password:"test1234"
            })
            .expect(400)
            .expect({
                message: "제목은 20글자, 본문은 200글자 이내로 작성해주세요.",
                statusCode: 400
            })
    });

    test("FAIL: create post", async () => {
        await request(app)
            .post("/post")
            .send({
                title: "test",
                content: "test",
                password:"test"
            })
            .expect(400)
            .expect({
                message: "비밀번호는 숫자, 문자를 포함해 6글자 이상입력해주세요.",
                statusCode: 400
            })
    });

    test("SUCCESS: edit post", async () => {
        await request(app)
            .patch("/post")
            .send({
                id: testId,
                title: "edit test",
                content: "test",
                password:"test1234"
            })
            .expect(200)
            .expect({
                message: "게시글을 수정하였습니다.",
                statusCode: 200
            })
    });

    test("FAIL: edit post - wrong id", async () => {
        await request(app)
            .patch("/post")
            .send({
                id: "qwersaf1234",
                title: "edit test",
                content: "test",
                password:"test1234"
            })
            .expect(400)
            .expect({
                message: "게시글이 존재하지 않습니다.",
                statusCode: 400
            })
    });

    test("FAIL: edit post - wrong password", async () => {
        await request(app)
            .patch("/post")
            .send({
                id: testId,
                title: "edit test",
                content: "test",
                password:"te234"
            })
            .expect(400)
            .expect({
                message: "비밀번호가 일치하지 않습니다.",
                statusCode: 400
            })
    });

    test("SUCCESS: get post", async () => {
        await request(app)
            .get("/post")
            .query({id: testId})
            .expect(200)
    });

    test("SUCCESS: get post list", async () => {
        await request(app)
            .get("/post/list")
            .expect(200)
    });
});