# WebSocketWithNodeJs

## WebSocket with Node.js

Test for web api and websocket with Node.js

## Environment
- Visual Studio Code for Mac
- Docker Desktop Community 2.0.0.3
### Client Side
 - Node.js 10.15.3
 - npm 6.4.1
 - angular 7.3.8
### Server Side 
 - Node.js 10.15.3
 - npm 6.4.1
 - angular 7.3.8
 - Typescript 3.0.1

## License
Free

## How to Start
1. Build Docker Image with docker-compose.yml
```sh
$> ./build.sh
```
2. Start Dokcer Container
```sh
$> ./start.sh
```
3. Run server   
3.1. Run shell in server container
```
$> cd server
$> ./startShell.sh
```   
3.2. Run Server
The follow is in sever shell
```
($> npm install)
$> npm run run
```
4. Run Client   
4.1 Run shell in client container
```
$> cd client
$> ./startShell.sh
```
4.2 Run Client
the follow i in client shell
```
($> npm install)
$> ngserve.sh
```
