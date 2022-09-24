# nft-tracker-bot
It's a discord bot (javascript) that allows you to display an embed in your discord server each time there is a purchase on the collection of your choice. Everything is automatic, you just have to create a discord bot &amp; get an Infura API key.

#### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).


###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Project Install

    $ git clone https://github.com/Nitr0z/nft-tracker-bot
    $ cd nft-tracker-bot
    $ yarn install
    
    
## Project Install

    $ Edit your information in token.js and index.js:
    $ API Infura
    $ CollectionAddress
    $ DiscordChannel


## Install PM2 for launch Bot

    $ sudo npm install pm2 -g
    $ pm2 start index.js
