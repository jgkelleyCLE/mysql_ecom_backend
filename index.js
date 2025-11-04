import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/ProductRoutes.js'
import partRoutes from './routes/PartRoutes.js'
import userRoutes from './routes/UserRoutes.js'
import orderRoutes from './routes/OrderRoutes.js'
import emailRoutes from './routes/EmailRoutes.js'
import searchRoutes from './routes/SearchRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

const port = process.env.PORT

//ROUTING
app.use('/api/products', productRoutes)
app.use('/api/parts', partRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/email', emailRoutes)
app.use('/api/search', searchRoutes)

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
})

