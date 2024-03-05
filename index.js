const express = require('express')
const mongoDb = require('./db');
const app = express()
const port = process.env.PORT

mongoDb();

app.get('/', (req, res) => {
  res.send('Welcome to Food Express!')
})

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

// app.use() is middleware-it will take a middleware fn
// It is used to mount middleware functions in the application's request processing pipeline. Middleware functions in Express have
// access to the request (req) and response (res) objects, and they can perform various tasks such as modifying the request or
// response, executing code, or passing control to the next middleware in the stack.

app.use(express.json())

app.use('/api', require('./routes/createUser'))

app.use('/api', require('./routes/userLogin'))

app.use('/api', require('./routes/displayFoodData'))

app.use('/api', require('./routes/createOrder'))

app.use('/api', require('./routes/getMyOrders'))

app.listen(port, () => {
  console.log(`Food Express app listening on port ${port}`)
})
