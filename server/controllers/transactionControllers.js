import transactionModel from "../models/transactionModel.js"; // Import the Transaction model

// Controller function to add a new transaction
const addTransaction = async (req, res) => {
  try {
    // Get the user ID from req.user (set by the protectUser middleware)
    const userId = req.user._id;

    const { account, amount, type,date } = req.body;

    // Validate required fields
    if (!account || !amount || !type || !date) {
      return res.json({ success: false, message: "All fields are required." });
    }

    // Create a new transaction
    const newTransaction = new transactionModel({
      userId, // Automatically use the userId from req.user
      account,
      amount,
      type,
      date,
    });

    // Save the transaction to the database
    await newTransaction.save();

    res.json({success:true, message: "Transaction added successfully", newTransaction });
  } catch (error) {
    res.json({success:false, message: error.message });
  }
};

// Controller function to get all transactions related to the authenticated user
 const getTransactions = async (req, res) => {
  try {
    // Get the userId from req.user (set by the protectUser middleware)
    const userId = req.user._id;

    // Find all transactions related to the user
    const transactions = await transactionModel.find({ userId });

    if (transactions.length === 0) {
      return res.json({ success: false, message: "No transactions found for this user." });
    }

    // Return the transactions
    res.json({ success: true, transactions });
  } catch (error) {
    res.json({ success: false, message: error.message});
  }
};

// Controller function to update a transaction
const updateTransaction = async (req, res) => {
  try {
    // Get the userId from req.user (set by the protectUser middleware)
    const userId = req.user._id;

    // Get the transaction ID and the fields to update from the request
    const { transactionId } = req.params;
    const { account, amount, type, category,date } = req.body;

    // Find the transaction by its ID and ensure the user is the owner
    const transaction = await transactionModel.findOne({ _id: transactionId, userId });

    if (!transaction) {
      return res.json({ success: false, message: "Transaction not found or not authorized to edit this transaction." });
    }

    // Update the transaction fields with the provided values
    if (account) transaction.account = account;
    if (amount) transaction.amount = amount;
    if (type) transaction.type = type;
    if (category) transaction.category = category;
    if (date) transaction.date = date;

    // Save the updated transaction
    await transaction.save();

    res.json({ success: true, message: "Transaction updated successfully", transaction });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    // Get the userId from req.user (set by the protectUser middleware)
    const userId = req.user._id;

    // Get the transaction ID from the request parameters
    const { transactionId } = req.params;

    // Find the transaction by its ID and ensure the user is the owner
    const transaction = await transactionModel.findOne({ _id: transactionId, userId });

    if (!transaction) {
      return res.json({ 
        success: false, 
        message: "Transaction not found or not authorized to delete this transaction." 
      });
    }

    // Delete the transaction using deleteOne
    await transactionModel.deleteOne({ _id: transactionId });

    res.json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {addTransaction,getTransactions,updateTransaction,deleteTransaction}