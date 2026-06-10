import interviewFeedbackService from "../services/interviewFeedback.service.js";

class InterviewFeedbackController {
  async createFeedback(req, res, next) {
    try {
      const feedback =
        await interviewFeedbackService.createFeedback(
          req.body
        );

      res.status(201).json({
        success: true,
        data: feedback,
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
        await interviewFeedbackService.getAllFeedbacks();

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