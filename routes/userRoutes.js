import express, { Router } from "express";
import userAuth from "../middelwares/authMiddleware.js";
import { userController } from "../controllers/userController.js";

const router = express.Router();

router.put("/update-user", userAuth, userController);

export default router;
