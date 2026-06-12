import express from "express";
import interviewFeedbackController from "../controllers/interviewFeedback.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateJWT,
  interviewFeedbackController.createFeedback
);

router.get(
  "/",
  authenticateJWT,
  interviewFeedbackController.getAllFeedbacks
);

router.get(
  "/:id",
  authenticateJWT,
  interviewFeedbackController.getFeedbackById
);

router.patch(
  "/:id",
  authenticateJWT,
  interviewFeedbackController.updateFeedback
);

router.delete(
  "/:id",
  authenticateJWT,
  interviewFeedbackController.deleteFeedback
);

export default router;