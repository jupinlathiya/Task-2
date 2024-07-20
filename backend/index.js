const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const cors = require('cors');
const app = express()
dotenv.config()
connectDB()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.use(cors());
app.use('/api', adminRoutes);
app.use('/api/user',userRoutes)

app.use((error, req, res, next) => {
  //error handling middleware
  const statusCode = error.statusCode || 500
  const message = error.message
  return res.status(statusCode).json({ status: false, message: message })
})


app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
