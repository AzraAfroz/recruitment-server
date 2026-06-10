import express from "express";
import interviewFeedbackController from "../controllers/interviewFeedback.controller.js";

const router = express.Router();

router.post(
  "/create-feedback",
  interviewFeedbackController.createFeedback
);

router.get(
  "/all-feedbacks",
  interviewFeedbackController.getAllFeedbacks
);

router.get(
  "/:id",
  interviewFeedbackController.getFeedbackById
);

router.put(
  "/:id",
  interviewFeedbackController.updateFeedback
);

router.delete(
  "/:id",
  interviewFeedbackController.deleteFeedback
);

export default router;