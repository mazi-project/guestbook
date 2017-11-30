// Register npm run build script of package.json to the pm2 process manager

module.exports = {
  "watch": false,
  "name": "guestbook-front-end",
  "cwd": "./",
  "script": "npm",
  "args": "run watch",
  "exec_interpreter": "babel-node",
  "exec_mode": "fork"
}