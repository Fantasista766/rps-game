import React from "react";

type TransactionErrorMessageProps = {
  message: string;
  dismiss: React.MouseEventHandler<HTMLButtonElement>;
};

const TransactionErrorMessage: React.FunctionComponent<
  TransactionErrorMessageProps
> = ({ message, dismiss }) => {
  return (
    <div className="alert alert-danger d-flex justify-content-between">
      <span>TX error: {message}</span>
      <button type="button" className="btn-close" onClick={dismiss}></button>
    </div>
  );
};

export default TransactionErrorMessage;
