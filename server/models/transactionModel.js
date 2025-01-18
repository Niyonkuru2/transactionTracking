import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    account: {
      type: String,
      required: true,
      enum: ["Bank", "Cash", "Mobile Money"],
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ["Income", "Expense"],
    },
    subCategory: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  }) 
const transactionModel = mongoose.models.transaction || mongoose.model("transaction",transactionSchema)
  
export default transactionModel;
