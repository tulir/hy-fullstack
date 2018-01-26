const http = require("http")
const {port, mongoURL} = require("./util/config")
const mongoose = require("mongoose")

mongoose.connect(mongoURL)
mongoose.Promise = Promise

process.on("unhandledRejection", r => console.error(r))

const app = require("express")()
app.use(require("cors")())
app.use(require("body-parser").json())
app.use(require("./util/token"))
app.use("/api/blogs", require("./controller/blog"))
app.use("/api/users", require("./controller/user"))
app.use("/api/login", require("./controller/login"))

const server = http.createServer(app)
server.listen(port)
server.on("close", () => mongoose.connection.close())

module.exports = {app, server}
