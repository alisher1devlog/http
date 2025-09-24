import http from "node:http";

const server = http.createServer((req,res)=>{
    const method = req.method;

    if (method.toLowerCase() ==='get') {
        res.writeHead(200, {"content-type": "text/plain"});
        res.write("Salom dunyo");
        res.write("hello");
        res.end("get method")
    }else if()
});

server.listen(3000, ()=>{
    console.log("server running on port 3000");
});