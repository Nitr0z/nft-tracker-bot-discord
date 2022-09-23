const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const Web3 = require('web3');

// get your discord bot token from https://discord.com/developers/applications
const token = require("./token.json")
// put your own infura key here
const web3 = new Web3('wss://mainnet.infura.io/ws/v3/a7d1163123a14aa88c936edaf6b3f114');
 // define global variables
 const collectionAdress = "0x28AaF29992B43e093A7D883c7427bd1fF4a6665b";
 const collectionName = "Dark Taverns";
 const collectionImg = "https://media.discordapp.net/attachments/739518433779122191/1022907541715439636/taverns.png?width=1193&height=671";
 const discordChannel = "739518433779122191";



  // ----------------------------------------------------------------------------------------------------------------------------------------------------------
client.on('ready', () => {
    console.log('Bot ok');
  });

  client.login(token.token);


// subscrirbe to the contract events
    var subscription = web3.eth.subscribe('logs', {
      address: collectionAdress,
  });

  // after subscription is created, start listening for data
  subscription.on('data', event => {
    // check if the event is a transfer or buy(length = 4) else it is a mint
    if (event.topics.length == 4) {
        let transaction = web3.eth.abi.decodeLog([{
            type: 'address',
            name: 'from',
            indexed: true
        }, {
            type: 'address',
            name: 'to',
            indexed: true
        }, {
            type: 'uint256',
            name: 'tokenId',
            indexed: true
        }],
            event.data,
            [event.topics[1], event.topics[2], event.topics[3]]);


        // put in variables
        var from = transaction.from;
        var to = transaction.to;
        var tokenId = transaction.tokenId;

        // with token id, get the token uri


        // get the transaction price
        web3.eth.getTransaction(event.transactionHash).then((transaction) => {
            // if the price is > 0 it's a buy, else it's a transfer and we print nothing
            if (web3.utils.fromWei(transaction.value, 'ether') > 0) {
                // print the transaction on discord
                const channel = client.channels.cache.get(discordChannel);
                const embed8 = new Discord.MessageEmbed()
                .setTitle('**'+collectionName+' #'+tokenId+'** has been sold !')
                .setURL('https://opensea.io/assets/'+collectionAdress+'/'+tokenId)
                .addFields(
                    { name: 'Item : ', value: collectionName+' #'+tokenId+''},
                    { name: 'Price : ' , value: '' + web3.utils.fromWei(transaction.value, 'ether') + ' ETH ($)'},
                    { name: 'From : ', value: '['+from.substring(0, 6)+'...'+from.substring(38, 42)+'](https://opensea.io/accounts/'+from+')', inline: true},
                    { name: 'To : ', value: '['+to.substring(0, 6)+'...'+from.substring(38, 42)+'](https://opensea.io/accounts/'+to+')', inline: true},
                )
                .setImage(collectionImg)
                .setFooter(collectionName+' | '+new Date().toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
                .setColor('RANDOM')
                channel.send(embed8)
            } else {
                // do nothing
            }
        });
    }
})
  
  
