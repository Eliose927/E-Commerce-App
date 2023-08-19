import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
//import CreateCategory from './client/src/pages/Admin/CreateCategory.js'
dotenv.config()

//database config
connectDB()
//rest object
const app = express()

//midlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())



//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

//rest api
app.get('/', (req, res) => {
    res.send(
        " <h1>tanisha</h1>"
    )
})

const port = process.env.port || 8080
const mode = process.env.mode
app.listen(port, () => console.log(`Server runnning on  ${mode} port ${port}....`))