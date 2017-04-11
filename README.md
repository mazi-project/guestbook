# MAZI Guestbook

Mazi-board or MAZI Guestbook is an application part of the MAZI toolkit for sharing ideas, photos and more, related to the specific place where a MAZI Zone is deployed, a form of digital Guestbook. See here for more details and documentation: https://github.com/mazi-project/guestbook/wiki

## Server Requirements

* mongodb installed
* npm installed
* node installed

## Installation

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


## Credits

Mazi-board is an application developed initially by https://github.com/lutzer, to complement the Hybrid LetterBox: http://www.design-research-lab.org/projects/hybrid-letter-box/, with a local offline application to view, comment, and add new cards through a device.

As part of the MAZI toolkit is being further developed to be used as a generic application.
