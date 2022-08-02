const hre = require("hardhat");

async function main() {
  const TwitterClone = await hre.ethers.getContractFactory(
    "TwitterCloneContract"
  );
  const TwiteerContract = await TwitterClone.deploy();
  // Wait until contract is deployed
  await TwiteerContract.deployed();
  console.log("Twitter Clone deployed to:", TwiteerContract.address);
}
main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
  });
