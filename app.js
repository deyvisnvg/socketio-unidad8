const express = require("express");
const path = require('path');
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);

// app.use(express.static(__dirname + 'public'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// app.get("/", (req, res) => {
//     res.redirect("index.html")
// })

io.on('connection', socket => {
    console.log("A user connectado to the session")

    socket.on('disconnect', () => {
        console.log("A user disconnected fron the session")
    })

    socket.on('Chat message', (msg) => {
        io.emit("Chat message", msg);
    })
})


const port = 3005;

server.listen(port, () => {
    console.log(`Server start in http://localhost:${port}`)
})