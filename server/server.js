import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './route/usersRoute.js'
import transactionRouter from './route/transactionRoute.js'

//initialize express
const app = express()

//connect to database
await connectDB()

//middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json())
//Routes
app.use('/api/user',userRouter)
app.use('/api/transaction',transactionRouter)
app.get('/',(req,res)=>res.send("Express server is Running"))

//port
const PORT = process.env.PORT|| 8439

app.listen(PORT,()=>{
    console.log(`Server is Running on port ${PORT}`);
})