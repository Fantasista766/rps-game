"use client";

import React, { useState } from "react";

import { ethers, ZeroAddress } from "ethers";
import { RockPaperScissors__factory } from "@/typechain";
import type { RockPaperScissors } from "@/typechain";
import type { BrowserProvider } from "ethers";

import MetamaskInfo from "@/components/MetamaskInfo";
import TxInfo from "@/components/TxInfo";
import MainInfo from "@/components/MainInfo";

const SEPOLIA_NETWORK_ID = "0xaa36a7";
const ROCK_PAPER_SCISSORS_ADDRESS =
  "0x9Be6e8c3D104B2f1d07fA46e497423467166502d";

const BOT_ADDRESS = "0x7847150AB80cB9fD02f56e616E3912a2d8119799"; // deployer

const WINNERS: { [key: string]: string } = {};
WINNERS[BOT_ADDRESS] = "DEFEAT";
WINNERS[ZeroAddress] = "DRAW";

const MOVES: [string, string, string] = ["ROCK", "PAPER", "SCISSORS"];

declare let window: {
  ethereum?: {
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    on: (
      event: "accountsChanged" | "chainChanged",
      callback: (accountsOrNetwork: string[] | string) => void
    ) => void;
  };
};

type CurrentConnectionProps = {
  provider: BrowserProvider | undefined;
  contract: RockPaperScissors | undefined;
  signer: ethers.JsonRpcSigner;
};

export default function Home() {
  const [networkError, setNetworkError] = useState<string | undefined>();
  const [txBeingSent, setTxBeingSent] = useState<string | undefined>();
  const [transactionError, setTransactionError] = useState<Error | undefined>();
  const [currentBalance, setCurrentBalance] = useState<string | undefined>();
  const [winner, setWinner] = useState<string | undefined>();
  const [currentConnection, setCurrentConnection] = useState<
    CurrentConnectionProps | undefined
  >(undefined);

  const [playerMove, setPlayerMove] = useState<string | undefined>();
  const [botMove, setBotMove] = useState<string | undefined>();

  const _connectWallet = async () => {
    if (window.ethereum === undefined) {
      setNetworkError("Please install Metamask!");
      return;
    }

    if (!(await _checkNetwork())) {
      return;
    }

    const [selectedAccount] = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];

    await _initialize(selectedAccount);

    window.ethereum.on(
      "accountsChanged",
      async (accountsOrNetwork: string | string[]) => {
        if (typeof accountsOrNetwork === "string") {
          return;
        }

        const newAccount = accountsOrNetwork[0];
        if (!newAccount) {
          return _resetState();
        }

        await _initialize(newAccount);
      }
    );

    window.ethereum.on("chainChanged", () => {
      return _resetState();
    });
  };

  const _checkNetwork = async (): Promise<boolean> => {
    if (!window.ethereum) {
      setNetworkError("Metamask is not installed.");
      return false;
    }

    const chosenChainId = (await window.ethereum.request({
      method: "eth_chainId",
    })) as string;

    if (chosenChainId === SEPOLIA_NETWORK_ID) {
      return true;
    }

    setNetworkError("Please connect to sepolia network!");
    return false;
  };

  const _initialize = async (selectedAccount: string) => {
    const provider = new ethers.BrowserProvider(window.ethereum!);
    const signer = await provider.getSigner(selectedAccount);
    if (signer) {
      setCurrentConnection({
        provider,
        signer,
        contract: RockPaperScissors__factory.connect(
          ROCK_PAPER_SCISSORS_ADDRESS,
          signer
        ),
      });
    }
  };

  const _resetState = () => {
    setNetworkError(undefined);
    setTxBeingSent(undefined);
    setTransactionError(undefined);
    setCurrentBalance(undefined);
    setWinner(undefined);
    setCurrentConnection(undefined);
  };

  const handlePlay = async (_playerMove: number) => {
    if (currentConnection) {
      const _botMove = getBotMove();
      setBotMove(MOVES[_botMove]);
      setPlayerMove(MOVES[_playerMove]);
      const tx = await currentConnection?.contract?.play(_playerMove, _botMove);
      setTxBeingSent(tx?.hash);
      await tx?.wait();
      const _winner = await currentConnection?.contract?.winner.call("");
      setWinner(_winner);
    }
  };

  const handleNewGame = async () => {
    if (currentConnection) {
      setWinner(undefined);
      setTxBeingSent(undefined);
    }
  };

  const _dismissNetworkError = () => {
    setNetworkError(undefined);
  };

  const _dismissTransactionError = () => {
    setTransactionError(undefined);
  };

  const _getRpcErrorMessage = (error: {
    data?: { message: string };
    message: string;
  }): string => {
    console.log(error);
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  };

  return (
    <div id="container" className="container my-5">
      <MetamaskInfo
        currentConnection={currentConnection}
        currentBalance={currentBalance}
        connectWallet={_connectWallet}
        resetState={_resetState}
        networkError={networkError}
        _dismissNetworkError={_dismissNetworkError}
      />

      <MainInfo
        txBeingSent={txBeingSent}
        winner={winner}
        handlePlay={handlePlay}
        currentConnection={currentConnection}
        WINNERS={WINNERS}
        handleNewGame={handleNewGame}
        playerMove={playerMove}
        botMove={botMove}
      />
      <TxInfo
        txBeingSent={txBeingSent}
        winner={winner}
        transactionError={transactionError}
        _getRpcErrorMessage={_getRpcErrorMessage}
        _dismissTransactionError={_dismissTransactionError}
      />
    </div>
  );
}

function getBotMove(): number {
  return Math.floor(Math.random() * 3);
}

export type { CurrentConnectionProps };
