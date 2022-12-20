const express = require('express')
const app = express()


app.use(express.json())

const router = require('./routes/product.router.js')

app.use('/bajaj/products', router)

app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8000





app.listen(PORT, () => {
    console.log(`Hey Bajaj!! Server is running on port ${PORT}`)
})