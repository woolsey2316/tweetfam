import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js"
import { verifyToken } from "../middleware/auth.js";
import { lenientLimiter } from "../middleware/rate-limiter.js"

const router = express.Router();

/* read */
router.get("/", lenientLimiter, verifyToken, getFeedPosts);
router.get("/:userId/posts", lenientLimiter, verifyToken, getUserPosts);

/* Update */
router.patch("/:id/like", lenientLimiter, verifyToken, likePost);

export default router
