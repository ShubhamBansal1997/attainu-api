const express = require('express')
const userRouter = require('./routers/user')
const port = process.env.PORT
var path = require('path');
require('./db/db')

const app = express()
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(userRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

