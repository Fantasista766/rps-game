import hre, { ethers } from "hardhat";

async function main() {
  // console.log("DEPLOYING...");

  // const RockPaperScissors = await ethers.getContractFactory(
  //   "RockPaperScissors"
  // );
  // const rockPaperScissors = await RockPaperScissors.deploy();
  // await rockPaperScissors.waitForDeployment();
  // console.log(rockPaperScissors.target);

  console.log("VERIFYING...");
  const addr = "0x9Be6e8c3D104B2f1d07fA46e497423467166502d";
  await hre.run("verify:verify", {
    address: addr,
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
