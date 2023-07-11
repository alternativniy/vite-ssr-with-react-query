// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import React, { ReactNode, useContext } from "react";
import { PageContext } from "./types";

export { PageContextProvider };
export { usePageContext };

const Context = React.createContext<PageContext | null>(null);

function PageContextProvider({
  pageContext,
  children,
}: {
  pageContext: PageContext;
  children: ReactNode;
}) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
  const pageContext = useContext(Context);
  return pageContext;
}
