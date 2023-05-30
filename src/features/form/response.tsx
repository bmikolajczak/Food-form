import { FC } from "react";

export const Response: FC<{ code?: number; msg: string; isLoading: boolean }> = ({ code, msg, isLoading }) => {
  return (
    <footer>
      <h4 aria-busy={isLoading}>{msg}</h4>
      <i>(Response code: {code})</i>
    </footer>
  );
};
