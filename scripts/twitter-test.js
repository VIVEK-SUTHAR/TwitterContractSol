const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.getContractFactory("TwitterCloneContract");
  const Twitter = await contract.deploy();

  await Twitter.deployed();

  console.log(Twitter.address);

  await Twitter.postTweet(1, "VIVEK", "FIRST TWEET", "");

  const allTweets = await Twitter.getTweets();

  console.log(allTweets);
}

main()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
