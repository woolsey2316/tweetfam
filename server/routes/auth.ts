import express from "express"
import { login, register } from "../controllers/auth.js"
import { strictLimiter } from "../middleware/rate-limiter.js"

const router = express.Router();

router.post("/login", strictLimiter, login)
router.post("/register", strictLimiter, register)
export default router;
