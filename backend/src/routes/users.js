import express from "express";
import { registerUser } from "../controllers/auth/register.js";
import {login} from "../controllers/auth/login.js";
import { getUsers } from "../controllers/users/getUsers.js";
import { getUser } from "../controllers/users/getUser.js";
import { getSingleUser } from "../controllers/users/getSingleUser.js";
import { updateUser } from "../controllers/users/updateUser.js";
import { deleteUser } from "../controllers/users/deleteUser.js";
import { authorizeUser, checkRole } from "../middleware/auth.js";
import { apiLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post ("/register-user", registerUser);
router.post  ("/login", apiLimiter, login);
router.get("/all-users", authorizeUser, checkRole("admin", "regular"), getUsers);
router.get("/users/:id", authorizeUser, checkRole("admin"), getUser);
router.get("/user/:id", authorizeUser, checkRole("admin"), getSingleUser);
router.patch("/edit-user/:id", authorizeUser, checkRole("admin", "regular"), updateUser);
router.delete("/:id", authorizeUser, checkRole("admin"), deleteUser);

export default router;
