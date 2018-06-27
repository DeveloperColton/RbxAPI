--[[
 __                                   __                  
|__)  _  _   _   _  _   _   _   _  _ /    _  | |_  _   _  
|    |  (_) (_) |  (_| ||| ||| (- |  \__ (_) | |_ (_) | ) 
            _/
__________________________________________________________
	
	RbxAPI by ProgrammerColton
	
	A super simple proxy server that allows you to proxy requests to the ROBLOX API from a game server.
	
	It's nothing special and super simple to use.
	I don't plan on anyone to use this, thus I'm not really gonna go into detail.
	
	Docs:
	
	GET /endpoint
	ex: /users/1
	
	As well, here is the respositroy link:
	https://github.com/ProgrammerColton/RbxAPI
	
	__________________________________________________________
	
	Here is a great documentation on the various ROBLOX apis. 
	https://github.com/matthewdean/roblox-web-apis
	
--]]

--// Code example:

local settingsHandler = require(script.Settings);
local rbxAPIHandler = require(script.RbxAPIModule);

--// Set up the handler.
local proxyServer = rbxAPIHandler:Setup(settingsHandler.url, settingsHandler.token);

--// Send a get request;
local getIdFromUsername = proxyServer:Get("/users/get-by-username?username=ProgrammerColton");
print(getIdFromUsername);
