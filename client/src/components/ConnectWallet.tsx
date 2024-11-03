import React from "react";
import NetworkErrorMessage from "./NetworkErrorMessage";

type ConnectWalletProps = {
  connectWallet: React.MouseEventHandler<HTMLButtonElement>;
  dismiss: React.MouseEventHandler<HTMLButtonElement>;
  networkError: string | undefined;
};

const ConnectWallet: React.FunctionComponent<ConnectWalletProps> = ({
  connectWallet,
  networkError,
  dismiss,
}) => {
  return (
    <>
      {networkError && (
        <div className="alert alert-danger">
          <NetworkErrorMessage message={networkError} dismiss={dismiss} />
        </div>
      )}

      <h3>Please connect your account...</h3>
      <button type="button" className="btn btn-warning" onClick={connectWallet}>
        Connect wallet
      </button>
    </>
  );
};

export default ConnectWallet;
