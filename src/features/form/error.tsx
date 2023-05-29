import { FC } from "react";

export const Error: FC<{ code?: number; msg: string; isLoading: boolean }> = ({ code, msg, isLoading }) => {
  return (
    <article>
      <h4 aria-busy={isLoading}>{msg}</h4>
      <p>Eror code: {code}</p>
    </article>
  );
};
