# NFT tracker bot 🦾

It's a discord nft sales tracker.

It is an open source project (Nodejs) that allows you to display an embed in your discord server each time there is a purchase on the collection of your choice. 

Everything is automatic, you just have to create a discord bot &amp; get an Infura API key.

It collects sales from opensea, magic eden, gem...

Working on ERC721 collection.

__Exemple :__


 ![image](https://media.discordapp.net/attachments/854840063988203570/1023270706089308170/sale1.png)
 ![image](https://media.discordapp.net/attachments/854840063988203570/1023312319536697465/sale3.png)
 
 
__Tutorial :__

https://www.youtube.com/watch?v=TvMOD3AKkXo&ab_channel=Nitr0z

 ---

### (Server 🎛️) Node installation on Ubuntu 

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm


### (Server 🎛️) Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## (Server & Localhost 💻) Project Install

    $ git clone https://github.com/Nitr0z/nft-tracker-bot
    $ cd nft-tracker-bot
    $ yarn install
    
    
## (Server 🎛️ & Localhost 💻) Edit your information
Edit your information in token.js and index.js:

    $ token.js (https://discord.com/developers/applications)
    $ API Infura (https://infura.io/create-project) choose "Web3 API"
    $ CollectionAddress
    $ DiscordChannel


## (Server 🎛️) Install PM2 to launch the bot 

    $ sudo npm install pm2 -g
    $ pm2 start index.js
    
    
## (Localhost 💻) Launch the bot 

    $ node index.js


---
 
 ## Now enjoy
 
    $ Made with ❤️ by @Nitr0z
 

 
 
