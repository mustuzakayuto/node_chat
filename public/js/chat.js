var socket = io()

socket.on("chat_message",(data)=>{
    console.log(data)
    var p = document.createElement("p");
    p.innerText = data.socket_id + ":"+data.message
    document.getElementById("chat-list").append(p)
    
})
function sendMessage(){
    console.log("send message")   
    var message = document.getElementById("message").value
    console.log(message)
    if (message){
        var data = {message:message}
        socket.emit("chat_message",data)
    }
    
    
    
}