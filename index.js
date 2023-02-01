const express =require("express")
const app = express()
const dotenv = require("dotenv")
const port = 5000
const product = require("./routes/product")
const userRoutes = require("./routes/userRoute")
const orderRoutes = require("./routes/orderRoutes")
const cookieParser = require("cookie-parser")
const errorMiddleware =require("./middleware/error")
const mongoose = require("mongoose")



app.use(express.json())
app.use(cookieParser())
// confiq
dotenv.config({path:"backend/config/config.env"})

// mongo connection
app.use("/",product)
app.use("/",userRoutes)
app.use("/",orderRoutes)
app.use(errorMiddleware)


mongoose.connect(CONNECTION_URL,{
    useNewUrlParser : true,
    useUnifiedTopology :true
})
.then(()=>app.listen(process.env.PORT||port,()=>{
    console.log(`server is runnig and database connet on ${process.env.PORT||port}`)
})).catch((err)=>{
    console.log(err.message)
})









