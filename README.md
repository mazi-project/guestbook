# Mazi Board Node Server




## Server Requirements

* mongodb installed
* npm installed
* node installed

## Setup

* go to src/node directory
* run `npm install`
* install pm2 globally : `npm install pm2 -g`
* `cp config.default.js config.js` and change database credentials and username and password in auth section

## Testing

* start your mongodb server with `mongod --dbpath <path_to_your_db>`

  * create two alias within your .bash_profile:

  ```shell
  alias stop-mongodb='mongo admin --eval "db.shutdownServer()"'
  alias start-mongodb='mongod --fork --logpath <your_db_dir>/mongodb.log  --dbpath <your_db_dir>'
  ```

* run `npm test`

## Deploying

*  create startup service for mongodb

*  create startup service for pm2
     * if you are using systemd, type: `pm2 startup systemd` then follow the instructions

*  `pm2 start main.js` and `pm2 save`

*  standard port for server is 8081, configure nginx or apache to forward http requests on port 80 to node server


