import MongoInterviewFeedbackRepository from "../repositories/implementations/mongoInterviewFeedbackRepository.js";
import { AppError } from "../utils/errors.js";

const feedbackRepo =
  new MongoInterviewFeedbackRepository();

class InterviewFeedbackService {
  async createFeedback(data) {
   
    if (!data.candidateId) {
      throw new AppError(
        "candidateId is required",
        400
      );
    }

    if (!data.jobRoleId) {
      throw new AppError(
        "jobRoleId is required",
        400
      );
    }

    if (!data.interviewerName) {
      throw new AppError(
        "interviewerName is required",
        400
      );
    }

    if (!data.feedback) {
      throw new AppError(
        "feedback is required",
        400
      );
    }

    if (
      !data.rating ||
      data.rating < 1 ||
      data.rating > 5
    ) {
      throw new AppError(
        "rating must be between 1 and 5",
        400
      );
    }

    // Basic validation to check if candidateId and jobRoleId are valid ObjectIds
    if (
      data.candidateId.length < 24
    ) {
      throw new AppError(
        "Candidate not found",
        404
      );
    }

    if (
      data.jobRoleId.length < 24
    ) {
      throw new AppError(
        "Job role not found",
        404
      );
    }

    return await feedbackRepo.createFeedback(
      data
    );
  }

  async getFeedbackById(id) {
    const feedback =
      await feedbackRepo.getFeedbackById(id);

    if (!feedback) {
      throw new AppError(
        "Feedback not found",
        404
      );
    }

    return feedback;
  }

  async getAllFeedbacks(query) {
    return await feedbackRepo.getAllFeedbacks(
      query
    );
  }

  async updateFeedback(id, data) {
    if (
      data.rating !== undefined &&
      (data.rating < 1 || data.rating > 5)
    ) {
      throw new AppError(
        "rating must be between 1 and 5",
        400
      );
    }

    const updated =
      await feedbackRepo.updateFeedback(
        id,
        data
      );

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