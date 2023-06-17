import express from 'express';
import validateRequest from '../middleware/validate-request';
import { requireAuth } from '../middleware/require-auth';
import { validateJwtRequest } from '../middleware/validate-user';
const router = express.Router();
router.get('/api/users/current-user', validateJwtRequest, requireAuth, (req, res) => {
  return res.send({ currentUser: req.currentUser });
});
export { router as currentUserRouter };
