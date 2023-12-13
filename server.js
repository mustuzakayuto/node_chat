const express = require("express")
const app = express()

app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname + '/public'));

const {createServer}= require('node:http')
const server = createServer(app)

const {Server} = require("socket.io")

const dotenv = require("dotenv");
dotenv.config();
const host = process.env.HOST;
const port = process.env.PORT;

const io = new Server(server);
io.on("connection",(socket)=>{
    console.log("connected!!")

    socket.on("chat_message",(data)=>{
        console.log(socket.id);
        console.log(data);
        //送信ユーザのSocketIDを追加
        data.socket_id = socket.id;
        //接続しているユーザにメッセージを送信
        io.emit('chat_message', data);
    })
})
server.listen(port,host,()=>{
    console.log(`listening on http://${host}:${port}`);
})