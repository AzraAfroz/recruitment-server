import mongoose from "mongoose";

const interviewFeedbackSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidateProfile",
      required: true,
      index: true,
    },
    jobRoleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobRole",
      required: true,
      index: true,
    },
    interviewerName: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Selected", "Rejected", "Hold"],
      default: "Hold",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "InterviewFeedback",
  interviewFeedbackSchema
);