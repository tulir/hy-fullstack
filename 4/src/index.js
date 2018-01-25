const http = require("http")
const {port, mongoURL} = require("./util/config")
const mongoose = require("mongoose")

mongoose.connect(mongoURL)
mongoose.Promise = Promise

const app = require("express")()
app.use(require("cors")())
app.use(require("body-parser").json())
app.use("/api/blogs", require("./controller/blog"))

const server = http.createServer(app)
server.listen(port)
server.on("close", () => mongoose.connection.close())

module.exports = {app, server}
