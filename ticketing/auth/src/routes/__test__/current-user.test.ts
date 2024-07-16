import request from "supertest";
import { app } from "../../app";
import { signinUtil } from "../../test/utils";
it("respond with details about the the current user", async () => {
  const cookie = await signinUtil();
  console.log(cookie);
  const response = await request(app)
    .get("/api/users/current-user")
    .send()
    .expect(200)
    .set("Cookie", cookie);
  expect(response.body.currentUser.email).toBeDefined();
});
it("should return 401 unauthorized when the user is not authenticated", async () => {
  await request(app).get("/api/users/current-user").send().expect(401);
});
