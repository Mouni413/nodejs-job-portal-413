import express from "express";
import userAuth from "../middelwares/authMiddleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobsController.js";

const router = express.Router();

router.post("/create-job", userAuth, createJobController);

router.get("/get-jobs", userAuth, getAllJobsController);

router.patch("/update-jobs/:id", userAuth, updateJobController);

router.delete("/delete-jobs/:id", userAuth, deleteJobController);

router.get("/job-stats", userAuth, jobStatsController);

export default router;
