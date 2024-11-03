import { ethers } from "ethers";
import type { CurrentConnectionProps } from "../app/page";

import ConnectWallet from "@/components/ConnectWallet";

interface MetamaskInfoProps {
  currentConnection: CurrentConnectionProps | undefined;
  currentBalance: string | undefined;
  connectWallet: () => void;
  resetState: () => void;
  networkError: string | undefined;
  _dismissNetworkError: () => void;
  className?: string;
}

const MetamaskInfo: React.FC<MetamaskInfoProps> = ({
  currentConnection,
  currentBalance,
  connectWallet,
  resetState,
  networkError,
  _dismissNetworkError,
}) => (
  <div id="metamask-info" className="card p-3 mb-4 shadow-sm">
    {!currentConnection?.signer && (
      <ConnectWallet
        connectWallet={connectWallet}
        networkError={networkError}
        dismiss={_dismissNetworkError}
      />
    )}

    {currentConnection?.signer && (
      <h3>
        Your address:{" "}
        <span className="text-primary">{currentConnection.signer.address}</span>
      </h3>
    )}

    {currentBalance && (
      <h3>
        Your balance:{" "}
        <span className="text-success">
          {ethers.formatEther(currentBalance)} ETH
        </span>
      </h3>
    )}

    {currentConnection?.signer && (
      <button type="button" className="btn btn-warning" onClick={resetState}>
        Disconnect
      </button>
    )}
  </div>
);

export default MetamaskInfo;
