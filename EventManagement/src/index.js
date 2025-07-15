import './config/env.js'
import app from "./app.js"
import { pool } from './config/db.js'
import { initDb } from './config/initDb.js'

const PORT = process.env.PORT

await initDb()

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})