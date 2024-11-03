import type { CurrentConnectionProps } from "../app/page";

interface MainInfoProps {
  txBeingSent: string | undefined;
  winner: string | undefined;
  handlePlay: (choice: number) => void;
  currentConnection: CurrentConnectionProps | undefined;
  WINNERS: { [key: string]: string };
  handleNewGame: () => void;
  playerMove: string | undefined;
  botMove: string | undefined;
}

const MainInfo: React.FC<MainInfoProps> = ({
  txBeingSent,
  winner,
  handlePlay,
  currentConnection,
  WINNERS,
  handleNewGame,
  playerMove,
  botMove,
}) =>
  currentConnection?.signer && (
    <div id="main-info" className="text-center">
      {!txBeingSent && !winner && (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Rock-Paper-Scissors</h1>
          <div className="btn-group" role="group">
            <button className="btn btn-primary" onClick={() => handlePlay(0)}>
              Rock
            </button>
            <button className="btn btn-primary" onClick={() => handlePlay(1)}>
              Paper
            </button>
            <button className="btn btn-primary" onClick={() => handlePlay(2)}>
              Scissors
            </button>
          </div>
        </div>
      )}
      {currentConnection?.signer && winner && (
        <div className="mt-4 card text-center">
          <div className="card-body">
            <h2 className="card-title text-info">
              Your move: <span className="text-primary">{playerMove}</span>
              <br />
              Bot move: <span className="text-danger">{botMove}</span>
              <br />
              Winner:{" "}
              <span
                className={`fw-bold ${
                  WINNERS[winner] === "DEFEAT"
                    ? "text-danger"
                    : WINNERS[winner] === "DRAW"
                    ? "text-warning"
                    : "text-success"
                }`}
              >
                {winner in WINNERS && WINNERS[winner] === "DEFEAT"
                  ? " BOT"
                  : WINNERS[winner] === "DRAW"
                  ? "NOBODY"
                  : "YOU"}
              </span>
              <br />
              Result:{" "}
              <span
                className={`badge ${
                  WINNERS[winner] === "DEFEAT"
                    ? "bg-danger"
                    : WINNERS[winner] === "DRAW"
                    ? "bg-warning"
                    : "bg-success"
                }`}
              >
                {winner in WINNERS ? (WINNERS[winner] as string) : "VICTORY!"}
              </span>
            </h2>
            <button className="btn btn-success mt-4" onClick={handleNewGame}>
              New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );

export default MainInfo;
