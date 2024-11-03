import WaitingForTransactionMessage from "@/components/WaitingForTransactionMessage";
import TransactionErrorMessage from "@/components/TransactionErrorMessage";

interface TxInfoProps {
  txBeingSent: string | undefined;
  winner: string | undefined;
  transactionError: Error | undefined;
  _getRpcErrorMessage: (error: Error) => string;
  _dismissTransactionError: () => void;
}

const TxInfo: React.FC<TxInfoProps> = ({
  txBeingSent,
  winner,
  transactionError,
  _getRpcErrorMessage,
  _dismissTransactionError,
}) => (
  <div id="tx-info">
    {txBeingSent && !winner && (
      <WaitingForTransactionMessage txHash={txBeingSent} />
    )}

    {transactionError && (
      <TransactionErrorMessage
        message={_getRpcErrorMessage(transactionError)}
        dismiss={_dismissTransactionError}
      />
    )}
  </div>
);

export default TxInfo;
