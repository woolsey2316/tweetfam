import express from "express";

import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js"

import { verifyToken } from "../middleware/auth.js"
import { lenientLimiter } from "../middleware/rate-limiter.js"
const router = express.Router()

/* READ */
router.get("/:id", lenientLimiter, verifyToken, getUser);
router.get("/:id/friends", lenientLimiter, verifyToken, getUserFriends);

/* update */
router.patch("/:id/:friendId", lenientLimiter, verifyToken, addRemoveFriend);

export default router;
