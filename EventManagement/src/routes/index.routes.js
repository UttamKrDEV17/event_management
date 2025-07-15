import express from 'express'
import eventRoutes from './event.routes.js'
import userRoutes from './user.routes.js'


const router = express.Router()

router.use('/events',eventRoutes)
router.use('/users',userRoutes)

export default router