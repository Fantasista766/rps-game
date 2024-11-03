// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";

contract RockPaperScissors is ERC165 {
    enum Move {
        Rock,
        Paper,
        Scissors
    }
    address public player;
    address public bot;
    address public winner;

    event GameResult(
        address indexed player,
        Move playerMove,
        Move botMove,
        address indexed winner
    );

    constructor() {
        bot = msg.sender;
    }

    function play(Move _playerMove, Move _botMove) public {
        require(msg.sender != bot, "Bot cannot play the game");

        winner = determineWinner(_playerMove, _botMove);
        emit GameResult(msg.sender, _playerMove, _botMove, winner);
    }

    function determineWinner(
        Move _playerMove,
        Move _botMove
    ) internal view returns (address) {
        if (_playerMove == _botMove) {
            return address(0x0);
        }

        if (
            (_playerMove == Move.Rock && _botMove == Move.Scissors) ||
            (_playerMove == Move.Scissors && _botMove == Move.Paper) ||
            (_playerMove == Move.Paper && _botMove == Move.Rock)
        ) {
            return msg.sender;
        } else {
            return bot;
        }
    }

    fallback() external {}
}
