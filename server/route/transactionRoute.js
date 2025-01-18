import express from 'express'
import { addTransaction, deleteTransaction, getTransactions, updateTransaction } from '../controllers/transactionControllers.js';
import { protectUser } from '../middlewares/userAuthentication.js';

const transactionRouter = express.Router();

transactionRouter.post('/add',protectUser,addTransaction);
transactionRouter.get('/all',protectUser,getTransactions);
transactionRouter.put('/update/:transactionId', protectUser, updateTransaction);
transactionRouter.delete('/delete/:transactionId', protectUser, deleteTransaction);

export default transactionRouter;