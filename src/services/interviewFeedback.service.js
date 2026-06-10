import MongoInterviewFeedbackRepository from "../repositories/implementations/mongoInterviewFeedbackRepository.js";
import { AppError } from "../utils/errors.js";

const feedbackRepo =
  new MongoInterviewFeedbackRepository();

class InterviewFeedbackService {
  async createFeedback(data) {
    return await feedbackRepo.createFeedback(data);
  }

  async getFeedbackById(id) {
    const feedback =
      await feedbackRepo.getFeedbackById(id);

    if (!feedback) {
      throw new AppError("Feedback not found", 404);
    }

    return feedback;
  }

  async getAllFeedbacks() {
    return await feedbackRepo.getAllFeedbacks();
  }

  async updateFeedback(id, data) {
    const updated =
      await feedbackRepo.updateFeedback(id, data);

    if (!updated) {
      throw new AppError(
        "Feedback not found",
        404
      );
    }

    return updated;
  }

  async deleteFeedback(id) {
    const deleted =
      await feedbackRepo.deleteFeedback(id);

    if (!deleted) {
      throw new AppError(
        "Feedback not found",
        404
      );
    }

    return deleted;
  }
}

export default new InterviewFeedbackService();