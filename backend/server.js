import express from'express'
import colors from'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDb from './config/db.js';
import authRoutes from'./routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
import cors from 'cors'
import path from 'path'
import{fileURLToPath} from 'url'
//config env
dotenv.config();

//esmodule fix
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

//db connection
connectDb()

//rest object
const app=express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))
//routes
app.use('/api/v1/auth',authRoutes)
//for category
app.use('/api/v1/category',categoryRoutes)
//for product
app.use('/api/v1/product',productRoutes)
//rest api

app.use('*',function(req,res){
res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//Port 

const PORT=process.env.PORT;

//run listen
app.listen(PORT,()=>{
console.log(`Server running on ${process.env.DEV_MODE} mode ${PORT}`.bgCyan.white);
})