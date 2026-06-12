import interviewFeedbackService from "../services/interviewFeedback.service.js";
import { AppError } from "../utils/errors.js";

class InterviewFeedbackController {
  async createFeedback(req, res, next) {
    try {
      const {
        candidateId,
        jobRoleId,
        interviewerName,
        rating,
        feedback,
      } = req.body;

      if (!candidateId) {
        throw new AppError("candidateId is required", 400);
      }

      if (!jobRoleId) {
        throw new AppError("jobRoleId is required", 400);
      }

      if (!interviewerName) {
        throw new AppError("interviewerName is required", 400);
      }

      if (!feedback) {
        throw new AppError("feedback is required", 400);
      }

      if (!rating || rating < 1 || rating > 5) {
        throw new AppError(
          "rating must be between 1 and 5",
          400
        );
      }

      const result =
        await interviewFeedbackService.createFeedback(
          req.body
        );

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFeedbackById(req, res, next) {
    try {
      const feedback =
        await interviewFeedbackService.getFeedbackById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: feedback,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllFeedbacks(req, res, next) {
    try {
      const feedbacks =
        await interviewFeedbackService.getAllFeedbacks(
          req.query
        );

      res.status(200).json({
        success: true,
        data: feedbacks,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateFeedback(req, res, next) {
    try {
      const { rating } = req.body;

      if (
        rating !== undefined &&
        (rating < 1 || rating > 5)
      ) {
        throw new AppError(
          "rating must be between 1 and 5",
          400
        );
      }

      const updated =
        await interviewFeedbackService.updateFeedback(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteFeedback(req, res, next) {
    try {
      await interviewFeedbackService.deleteFeedback(
        req.params.id
      );

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new InterviewFeedbackController();