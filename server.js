import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDb } from './config/db.js';
import userRouter from './Routes/UserRouter.js'
import productRouter from './Routes/ProductRouter.js'
import cartRouter from './Routes/CartRouter.js'
import invoiceRouter from './Routes/InvoiceRouter.js'
import { errHandler } from './middleware/errHandler.js';

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Kết nối data
connectDb()


// Cấu hình router
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/invoices", invoiceRouter)

// middleware xử lí lỗi 
app.use(errHandler)


const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})