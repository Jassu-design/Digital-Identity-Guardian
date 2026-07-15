import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import authRoutes from './routes/authRoutes.js'
import numberRoutes from './routes/numberRoutes.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy.' })
})

app.use('/api/auth', authRoutes)
app.use('/api/numbers', numberRoutes)

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' })
})

app.use((err, req, res, next) => {
  console.error(err.stack || err)
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
  })
})

export default app
