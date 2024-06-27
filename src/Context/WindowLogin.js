import { createContext, useEffect, useState } from 'react';

export const CONTEXT = createContext({});
export const OrderProvider = ({ children }) => {
  const [isState, setState] = useState(false);

  const handState = () => {
    setState(!isState);
  };

  return <CONTEXT.Provider value={{ isState, setState, handState }}>{children}</CONTEXT.Provider>;
};
