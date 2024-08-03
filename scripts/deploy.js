const hre = require("hardhat");

async function main() {
  const Dewitter = await hre.ethers.getContractFactory("Dewitter");
  const dewitter = await Dewitter.deploy();

  await dewitter.waitForDeployment();

  console.log("Dewitter contract deployed to:",await dewitter.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });