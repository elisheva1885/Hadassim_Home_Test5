require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbconnect")
const { default: mongoose } = require("mongoose")

const PORT = process.env.PORT || 7000
const app = express()
connectDB()
app.use(cors(corsOptions))
app.use(express.static("public"))
app.use(express.json())
app.use("/api/suppliers", require("./routes/suppliersRoute"))
app.use("/api/products", require("./routes/productsRoute"))
app.use("/api/auth/admin", require("./routes/adminRoute"))
app.use("/api/orders", require("./routes/ordersRouter"))

 app.get("/", (req, res)=>{res.send("This is home page")})


 mongoose.connection.once('open',()=>{
    console.log('Connect to database')
    app.listen(PORT,()=>{
        console.log(`server running on ${PORT}`);
    })
})

mongoose.connection.on('error', err=> {
    console.log(err)
})
