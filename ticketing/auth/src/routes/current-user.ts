import express from 'express';
import validateRequest from '../middleware/validate-request';
import { requireAuth } from '../middleware/require-auth';
const router = express.Router();
router.get('/api/users/current-user', validateRequest, requireAuth,(req, res) => {
  return res.send({currentUser: req.currentUser});
});
export { router as currentUserRouter };
