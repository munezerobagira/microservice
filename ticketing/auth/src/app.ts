import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { NotFoundException } from "./exceptions/not-found-exception";
import { errorHandler } from "./middleware/error-handler";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

export const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", (req, res) => {
  throw new NotFoundException();
});
app.use(errorHandler);
