import express from "express";
import { deleteUser, getAllUsers, register, login } from "../Controllers/UserController.js";
import { admin, protect } from "../middleware/auth.js";

const router = express.Router()

router.post("/", register)
router.post("/login", login)
router.get("/", getAllUsers)
router.delete("/:userId", protect, admin, deleteUser)




export default router