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
      
      throw error;
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

  async getAllFeedbacks({
    page = 1,
    limit = 10,
    status,
  } = {}) {
    const query = {};

    if (status) {
      query.status = status;
    }

    return await InterviewFeedback.find(query)
      .populate("candidateId")
      .populate("jobRoleId")
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
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