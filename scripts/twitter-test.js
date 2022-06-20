// scripts/buy-coffee.js

const hre = require("hardhat");

// Returns the Ether balance of a given address.
async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// prints the Ether balances for a list of addresses.
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx++;
  }
}
//This will return all the tweets which are coming from Smart contract
async function getAllTweets(tweets) {
  for (const tweet of tweets) {
    const timestamp = tweet.timestamp;
    const user = tweet.username;
    const userAddress = tweet.from;
    const message = tweet.tweetMessage;
    console.log(`At ${timestamp}, ${user} (${userAddress}) said: "${message}"`);
  }
}

async function main() {
  // Get the example accounts we'll be working with.
  const [owner, tweet, tweet2, tweet3] = await hre.ethers.getSigners();

  //FIrst contractFactory has all information about contracts and 
  //we are fetching data about contract named TwitterCloneContract
  //And then Deployinng it to the local environment by Hard Hat
  const TwitterClone = await hre.ethers.getContractFactory("TwitterCloneContract");
  const TwiteerContract = await TwitterClone.deploy();

  // Wait until contract is deployed
  await TwiteerContract.deployed();
  console.log("Twitter Clone deployed to:", TwiteerContract.address);

  // Check balances before tweeting the tweet
  const addresses = [owner.address, tweet.address, TwiteerContract.address];
  console.log("== Balances before Twitting ==");
  await printBalances(addresses);

  // sending some test tweet
  const gas_Fee = { value: hre.ethers.utils.parseEther("1") };
  await TwiteerContract.connect(owner).postTweet("@Umangp31", "80% work done of Twitter Frontend clone", gas_Fee);
  await TwiteerContract.connect(tweet2).postTweet("@iamviveksuthar", "Building Web3 version of blockchain", gas_Fee);
  await TwiteerContract.connect(tweet).postTweet("@somewhatSahil", "Building Production level is not for me", gas_Fee);
  await TwiteerContract.connect(tweet3).postTweet("@iamviveksuthar", "Solidity Smart Contract Tested Now Frontend Integration Reamin", gas_Fee);
  await TwiteerContract.connect(tweet2).postTweet("@somewhatSahil", "We are Building  Centralized and Decentralized Version OF Twitter in One site", gas_Fee);

  // Check balances after tweeting tweet.
  console.log("Succesfully sent yout Tweet to Block-Chain");
  await printBalances(addresses);

  // Check all the tweets
  console.log("== All Tweets ==");
  const tweets = await TwiteerContract.getTweets();
  getAllTweets(tweets);
}

//main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
