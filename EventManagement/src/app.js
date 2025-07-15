import express from "express"
import morgan from "morgan"
import router from "./routes/index.routes.js"

const app = express()

app.use(morgan('combined'))
app.use(express.json())


app.use('/api',router)


export default app;