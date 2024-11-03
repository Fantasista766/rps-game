import { loadFixture, ethers, expect } from "./setup";
import { ZeroAddress } from "ethers";

describe("RockPaperScissors", function () {
  const CHOICES_LEN = 3;
  async function deploy() {
    const [bot, player] = await ethers.getSigners();

    const RockPaperScissors = await ethers.getContractFactory(
      "RockPaperScissors"
    );
    const rockPaperScissors = await RockPaperScissors.deploy();
    await rockPaperScissors.waitForDeployment();

    return { rockPaperScissors, bot, player };
  }

  it("should draw", async function () {
    const { rockPaperScissors, player } = await loadFixture(deploy);
    const botMove = Math.floor(Math.random() * CHOICES_LEN);
    const playerMove = botMove;

    const tx = await rockPaperScissors
      .connect(player)
      .play(playerMove, botMove);
    await tx.wait();

    const winner = await rockPaperScissors.winner();

    expect(winner).to.eq(ZeroAddress);
  });

  it("should let player win", async function () {
    const { rockPaperScissors, player } = await loadFixture(deploy);

    const botMove = Math.floor(Math.random() * CHOICES_LEN);
    const playerMove = (botMove + 1) % CHOICES_LEN;

    const tx = await rockPaperScissors
      .connect(player)
      .play(playerMove, botMove);
    await tx.wait();

    const winner = await rockPaperScissors.winner();

    expect(winner).to.eq(player);
  });

  it("should let bot win", async function () {
    const { rockPaperScissors, bot, player } = await loadFixture(deploy);

    const playerMove = Math.floor(Math.random() * CHOICES_LEN);
    const botMove = (playerMove + 1) % CHOICES_LEN;

    const tx = await rockPaperScissors
      .connect(player)
      .play(playerMove, botMove);
    await tx.wait();

    const winner = await rockPaperScissors.winner();

    expect(winner).to.eq(bot);
  });
});
