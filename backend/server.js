import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'
const app = express() 



dotenv.config();

connectDB()

app.use(express.json())


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/', (req,res)=>
{
    res.send('API se pokrece...')
})

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname,'/uploads')))


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server se pokrece u ${process.env.NODE_ENV} mod na port ${PORT}`))