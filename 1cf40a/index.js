/*
 * This is a dirt simple 5 minute express server to host TerbiumSDK in a browser
 * to run this example goto the server directory and type "node index" in your terminal.
 * 
 * This is not a production server and should not be used as such, if you want to host on a node
 * server then you should build something more rebust using node and a load balancer.
 * 
 */

const program = require('commander'); 
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser'); 
const router = express.Router(); 
const path = require('path');  
const http = require('http2');  
const open = require('open');

program.version('14.0.002', '-v, --vers', 'Terbium SDK CLI Version');
 
program 
    .description('Starts the Terbium SDK Node Development Server') 
    .option('-p, --port [port]', 'Define the port the server will run on. (Default: 8080)', 8080)
    .option('-a, --address [address]', 'Defines the ip address the server will run on. (Default: localhost, 127.0.0.1)', '')
    .parse(process.argv);

const serverPort = program.port;
const serverIP = program.address; 

try { app.use(compression()); } catch (e) { }
 
try {
    app.use(  (req, res, next) =>{ 
        res.setHeader('X-Powered-By', 'TerbiumSDK Framework');
        next();
    })
}
catch (e) { }

try {
    app.use(compression());
}
catch (e) {
    console.log('e->', e.message);
}
 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
  
router.use((req, res, next) => { 
    let origin = req.headers.origin; 

    res.setHeader('X-Powered-By', 'TerbiumSDK Framework');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); 
        return res.status(200).json({});
    }
         
    next();
});
 
//Setting maxAge to -1 so refreshing the browser reflects all the changes.
app.use('/', express.static(path.resolve('../src'), { index: 'index.html', maxAge: -1 }));  

let url = 'http://localhost:' + serverPort;
if (serverIP != '') {
    url = 'http://' + serverIP + ':' + serverPort;
}

app.listen(serverPort, serverIP, () => {
    console.log('Server Started at ' + url);
    open(url);
});
