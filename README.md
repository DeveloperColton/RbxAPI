# RbxAPI

RbxAPI is a simple, open source proxy server that is used to request stuff from the ROBLOX api and return it to you. 

This is my first ever so called "public" project and I don't really expect anyone to use it. I simply did it for fun and for my own use in my projects. 

Please **do not spam** the server with requests. 

I made it pretty simple to get it up and going, so go ahead and listen to the instructions that I'm about to say.

# Setting up

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

- Click the button above and create an account if you need too.
- Name the app to whatever you want.
- Click the button with "Deploy app" on it. It'll start to build and set up the app for you.

- Click "View app" and copy the URL from the top of the page.
- Click "Manage app".

- Go to settings > config cars and click **Reveal Config Vars**
- Copy the TOKEN_KEY and keep it for future use.

# In Roblox Studio

The set-up in ROBLOX studio is as easy as the setting up on heroku. 

- Create a script inside ServerScriptService.
- Put 2 ModuleScripts inside the script.
- Name the script to whatever you wish.
- Name one of the ModuleScripts to "Settings" and the other to RbxAPIModule.

- Put the following code (or grab it from [here](https://github.com/ProgrammerColton/RbxAPI/blob/master/roblox/rbxapi.lua)) inside the server script:
```lua
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
```

- Put the following code (or grab it from [here](https://github.com/ProgrammerColton/RbxAPI/blob/master/roblox/rbxapimodule.lua)) inside the module named RbxAPIModule.
```lua
--[[
 __                                   __                  
|__)  _  _   _   _  _   _   _   _  _ /    _  | |_  _   _  
|    |  (_) (_) |  (_| ||| ||| (- |  \__ (_) | |_ (_) | ) 
            _/
__________________________________________________________

--]]
local RbxApi = {}

--// Variables:
local httpSerivce = game:GetService("HttpService");

function RbxApi:Setup(url, key)
	self.url = url;
	self.key = key;
	return self;
end

function RbxApi:Get(endpoint)
	local data = {
		["token"] = self.key;
	}
	local response;
	local url = self.url .."/api".. endpoint;
	local success, err = pcall(function()
		response = httpSerivce:GetAsync(url, false, data);
	end)
	if(success) then
		return response;
	else
		warn("Error: " .. err .. " when trying to get a request!");
	end
end

return RbxApi
```

- Finally, put the following code (or grab it from [here](https://github.com/ProgrammerColton/RbxAPI/blob/master/roblox/settings.lua)) inside the module named settings. 
```lua
local Settings = {
	["token"] = "YOUR_TOKEN_HERE",
	["url"] = "YOUR_URL_HERE"
	--// Note: Remove the slash at the end of your url, it'll be automatically replaced.
}

return Settings
```

- Grab your token and url from earlier and put it in the designated spots inside the settings module.

# End
Once you finish all the above steps, your basically done. You can now go ahead and see the example inside the server script for more detail on how to use this super simply API.

You can see all the of the ROBLOX api located [here](https://github.com/matthewdean/roblox-web-apis).

