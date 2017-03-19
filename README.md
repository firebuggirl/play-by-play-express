This project is a result of my following along with the Play by Play Course offered via Pluralsight with Sam Artioli:


Tasks:
-set up a Node app, build a web API with Express, integrate with MongoDB, and cache HTTP results with Redis.
-learn about offloading and proxying requests to multiple Node servers, organizing API routes, and avoiding blocking process and taking advantage of Node's event loop.

Notes:

Add data is added via Postman to start cats and dogs database
ex:

{
  "name":"buttons",
  "age":"2",
  "type":"siamese"
}

NPM install -g forever //runs the process as daemon in background and look and see to log files out and then it will restart if server crashes


run forever list //to see which processes are running

forever --help

forever start dog_server.js

http://127.0.0.1:3001/dog //running as Daemon in background

forever start cat_server.js

http://localhost:3000/cat //running as Daemon in background


To run redis server (for redis NoSQL caching): to start a redis-server instance first by typing redis-server before typing redis-cli in ANOTHER terminal. (type "KEYS *" to see cached keys)..make sure to reset all servers + redis-server + redis-cli when making any changes to cache


..should see http://localhost:3001/dog in keys returned via redis-cli

Warning: consider KEYS as a command that should only be used in production environments with extreme care.
http://stackoverflow.com/questions/5252099/redis-command-to-get-all-available-keys

....then re-start nodemon pet_server.js

//run nodemon pet_server.js //have nodemon run in the foreground for pet_server.js

http://localhost:3002/pets


run 'forever list' to see which processes are running

run 'forever stopall' to stop all forever processes/servers

NOTE: Highlight areas with dark text in terminal
so can see which servers are running
