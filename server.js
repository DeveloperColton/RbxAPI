/*
 __                                   __                  
|__)  _  _   _   _  _   _   _   _  _ /    _  | |_  _   _  
|    |  (_) (_) |  (_| ||| ||| (- |  \__ (_) | |_ (_) | ) 
            _/
__________________________________________________________

*/

// Variables:
const _express = require("express"),
      _proxy = require("http-proxy"),
      _https = require("https");
      _bodyParser = require("body-parser");
var client = _express();

var port = process.env.PORT || 5000; // Don't touch this unless you know what you are doing.
//var port = 8080; // For local host purposes.
var token = process.env.TOKEN_KEY;

var api = _express.Router();

// Thank you Froast for the snippet of code below.
let httpsProxy = _proxy.createProxyServer({
    agent: new _https.Agent({
        checkServerIdentity:function(host, certification){
            return undefined;
        }
    }),
    changeOrigin: true,
});

// Change proxy.
// Thank you Froast for the snippet of code below.
function proxyReq(proxyReq, res, res, options){
    proxyReq.setHeader('User-Agent', 'Google');
    proxyReq.removeHeader('roblox-id');
    console.log()
}

// Check authentication.
function checkAuthentication(req, res){
    if(!req.headers.token == token){
        return false;
    }
    return true;
}

// Proxy error.
function proxyError(err, req, res){
    if(err){
        console.log(err);
    }
    res.end("Error: Proxy failed, see console.");
}

httpsProxy.on('proxyReq', proxyReq);
httpsProxy.on('error', proxyError);

client.use(_bodyParser.json());
client.use("/api", api);

// Proxy requested.
api.use(function(req, res, next){
    var settings = {
        target: `https://api.roblox.com/`
    };
    if(req.headers.token){
        let tokenCheck = checkAuthentication(req, res);
        if(tokenCheck){
            httpsProxy.web(req, res, settings)
        } else {
            res.end("Error: Authentication key failure.");
        };
    } else {
        res.end("Error: No authentication key.");
    };
});


// Listen on the port.
client.listen(port, (err) =>{
    if(err){
        console.log(`Error: ${err}`);
        return;
    } else {
        console.log(`Server is now listenin' on port ${port}!`);
    }
})