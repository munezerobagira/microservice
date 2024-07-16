import { Request } from "express";
import { Session } from "express-session";
declare global {
  interface UserPayload {
    id: string;
    email: string;
  }
  namespace Express {
    interface Request {
      currentUser?: UserPayload | null;
      session?: Session;
    }
  }
}
