import React from "react";

type NetworkErrorMessageProps = {
  message: string;
  dismiss: React.MouseEventHandler<HTMLButtonElement>;
};

const NetworkErrorMessage: React.FunctionComponent<
  NetworkErrorMessageProps
> = ({ message, dismiss }) => {
  return (
    <div className="alert alert-danger d-flex justify-content-between">
      <span>TX error: {message}</span>
      <button type="button" className="btn-close" onClick={dismiss}></button>
    </div>
  );
};

export default NetworkErrorMessage;
