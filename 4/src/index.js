require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = Promise

const app = require("express")()
app.use(require("cors")())
app.use(require("body-parser").json())
app.use("/api/blogs", require("./controller/blog"))
app.listen(+process.env.PORT || 29392)
