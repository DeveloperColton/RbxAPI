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
