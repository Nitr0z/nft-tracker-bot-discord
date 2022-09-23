const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const Web3 = require('web3');

// get your discord bot token from https://discord.com/developers/applications
const token = require("./token.json")
// put your own infura key here
const web3 = new Web3('wss://mainnet.infura.io/ws/v3/your_infura_key');
 // define global variables
 const collectionAdress = ""; // exemple : 0x4510Ef604e0595F7151aDCBA0B958d39b8B16D40  | is Dark Taverns collection
 const collectionName = "";  // exemple : Dark Taverns
 const discordChannel = ""; // exemple : 739518433779122191



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

                // with token id, get the token url 
                const tokenURIABI = [
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            }
                        ],
                        "name": "tokenURI",
                        "outputs": [
                            {
                                "internalType": "string",
                                "name": "",
                                "type": "string"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    }
                ];
                
                const tokenContract = collectionAdress 
                const tokenId2 = tokenId
                
                const contract = new web3.eth.Contract(tokenURIABI, tokenContract)
                
                async function getNFTMetadata() {
                    const result = await contract.methods.tokenURI(tokenId2).call()
                    // get the image_url in json from result
                    const url = result;
                    axios.get(url)
                        .then(response => {
                            var img = response.data.image;
        
                            // si img commence par ipfs:// alors on le transforme en https://cloudflare-ipfs.com/ipfs/
                            if (img.startsWith("ipfs://")) {
                                img = img.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/"+img.substring(7));
                            } else {
                                // do nothing
                            }
        
                            // get the transaction price (eth ou weth) 
        
                            // get the transaction price
                            web3.eth.getTransaction(event.transactionHash).then((transaction) => {
                                var price = web3.utils.fromWei(transaction.value, 'ether');
                                    // print the transaction on discord
                                    const channel = client.channels.cache.get(discordChannel);
                                    const embed8 = new Discord.MessageEmbed()
                                    .setTitle('**'+collectionName+' #'+tokenId+'** has been sold !')
                                    .setURL('https://opensea.io/assets/'+collectionAdress+'/'+tokenId)
                                    .addFields(
                                        { name: 'Item : ', value: collectionName+' #'+tokenId+''},
                                        { name: 'Price : ' , value: '' + price + ' ETH ($)'},
                                        { name: 'From : ', value: '['+from.substring(0, 6)+'...'+from.substring(38, 42)+'](https://opensea.io/accounts/'+from+')', inline: true},
                                        { name: 'To : ', value: '['+to.substring(0, 6)+'...'+from.substring(38, 42)+'](https://opensea.io/accounts/'+to+')', inline: true},
                                    )
                                    .setImage(img)
                                    .setFooter(collectionName+' | '+new Date().toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
                                    .setColor('RANDOM')
                                    channel.send(embed8)
                            });
                        })
                }
        
                getNFTMetadata();
        
        
        
            }
        })
          
          
        