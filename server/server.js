// Server-side global variables
require(`dotenv`).config({path:`./config/.env`})


// Database
require(`./config/db`)


// Express
const express = require(`express`)
const app = express()


app.use(require(`body-parser`).json())
app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))


// Routers
app.use(require(`../server/routes/cars`))
app.use(require(`../server/routes/users`))
app.use(require(`../server/routes/topics`))
app.use(require(`../server/routes/comments`))


// Port
app.listen(process.env.SERVER_PORT, () => 
{
    console.log(`Connected to port ` + process.env.SERVER_PORT)
})


// Error 404
app.use((req, res, next) => {next(createError(404))})


// Handle errors
app.use(function (err, req, res, next)
{       
    if (!err.statusCode) 
    {
        err.statusCode = 500
    }
    
    // check that all required paramters are not empty in any route
    if (err instanceof ReferenceError)
    {
        err.statusCode = 400
        err.message = "Cannot reference a variable that has not been declared. This can be caused in run-time if the user did not input a parameter that is required by a router"
    }
    
    // Server-side error message
    console.log(err.message + "\nError Details...")
    // Server-side error details
    console.log(err)
    
    // return error message that will be displayed on client-side console
    res.status(err.statusCode).send(err.message)    
})