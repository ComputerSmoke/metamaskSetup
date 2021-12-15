//libraries
var express = require('express');
var app = express();
const http = require('http');
let rateLimit = require('express-rate-limit');
const helmet = require("helmet");

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 200
});
const httpServer = http.createServer(app);
httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});


//landing page
app.get('/',async function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/client',express.static(__dirname + '/client'));
app.use(limiter);
app.use(helmet({
    contentSecurityPolicy: false
}));