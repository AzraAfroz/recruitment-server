import mongoose from "mongoose";
import InterviewFeedback from "../../models/interviewFeedback.model.js";
import IInterviewFeedbackRepository from "../contracts/IInterviewFeedbackRepository.js";
import { AppError } from "../../utils/errors.js";

class MongoInterviewFeedbackRepository extends IInterviewFeedbackRepository {
  async createFeedback(data) {
    try {
      const feedback = new InterviewFeedback(data);
      return await feedback.save();
    } catch (error) {
      throw new AppError("Failed to create feedback", 500);
    }
  }

  async getFeedbackById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid feedback id", 400);
    }

    return await InterviewFeedback.findById(id)
      .populate("candidateId")
      .populate("jobRoleId")
      .lean();
  }

  async getAllFeedbacks() {
    return await InterviewFeedback.find()
      .populate("candidateId")
      .populate("jobRoleId")
      .sort({ createdAt: -1 })
      .lean();
  }

  async updateFeedback(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid feedback id", 400);
    }

    return await InterviewFeedback.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  }

  async deleteFeedback(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid feedback id", 400);
    }

    return await InterviewFeedback.findByIdAndDelete(id).lean();
  }
}

export default MongoInterviewFeedbackRepository;