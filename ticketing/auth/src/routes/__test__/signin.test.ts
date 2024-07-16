import request from "supertest";
import { app } from "../../app";
it("fails when a email doesn't exists", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});
it("fail when emails exists but invalid password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "invalidpassword",
    })
    .expect(400);
});
it("set cookie after successfuly signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  const response = await request(app).post("/api/users/signin").send({
    email: "test@test.com",
    password: "password",
  });
  expect(response.get("Set-Cookie")).toBeDefined();
});
