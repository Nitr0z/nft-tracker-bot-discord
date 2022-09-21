const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const token = require("./token.json")
const prefix = require("./config.json");
const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/a7d1163123a14aa88c936edaf6b3f114');

// début du code
client.on('ready', () => {
    console.log('Bot ok');
  });
  
  client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
      const args = message.content.slice(prefix.length).split(/ +/);
      const command = args.shift().toLowerCase();
  
      if (!client.commands.has(command)) return;
  
      try {
        client.commands.get(command).execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply("Une erreur s'est produite pendant l'exécution de la commande !");
      }
  })
  
  client.login(token.token);



  // ----------------------------------------------------------------------------------------------------------------------------------------------------------
  // delay publication / regarder toutes les 5 mins s'il y à une nouvelle transaction sur le token erc721
  setInterval(async function(){
    var subscription = web3.eth.subscribe('logs', {
          address: '0x4510ef604e0595f7151adcba0b958d39b8b16d40'
      }, function(error, result){
          if (!error)
              console.log(result);
      });


  
}, 5000);