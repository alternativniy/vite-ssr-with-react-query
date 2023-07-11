export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProps };

import React from "react";
import type {
  PageContextBuiltIn,
  
  // When using Client Routing https://vite-plugin-ssr.com/clientRouting
  PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient

  // When using Server Routing
  // PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
  //*/
} from "vite-plugin-ssr/types";

type Page = (pageProps: PageProps) => React.ReactElement;
type PageProps = {};

export type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps;
  urlPathname: string;
  exports: {
    documentProps?: {
      title?: string;
      description?: string;
    };
  };
  documentProps?: {
    title?: string;
    description?: string;
  };
  dehydratedState?: unknown;
  isHydration: boolean;
};

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom;

type PageContext = PageContextClient | PageContextServer;