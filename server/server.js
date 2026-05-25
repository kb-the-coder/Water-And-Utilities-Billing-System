import express from 'express'
import 'dotenv/config'
import { db_conn } from './config/db.js'
import { userRouter } from './Router/UserRouter.js'
import cors from 'cors'

const port = process.env.PORT

db_conn()

const origns = ["http://localhost:5173", "http://localhost:5174"];

const app =express()
app.use(express.json())
app.use(cors({
    origin:origns,
    credentials:true
}))

app.listen(port,()=>{
    console.log(`Server Running On http://localhost:${port}`)
})

app.use("/api/auth",userRouter)