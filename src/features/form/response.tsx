import { FC } from "react";

export const Response: FC<{ msg: string; isLoading: boolean }> = ({ msg, isLoading }) => {
  return (
    <footer>
      <h4 aria-busy={isLoading}>{msg}</h4>
    </footer>
  );
};
