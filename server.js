const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000; //port from envrionment variable or hardcoded to 3000 (default);
const server = http.createServer(app); //here the parameter includes "listener" which listenes to the request and provides response
server.listen(port); //starts listening on the part
//listener is the request handler 
// so here app is the request handler
// so the app created using express is the request handler
