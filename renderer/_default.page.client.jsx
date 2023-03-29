export const clientRouting = true;
export const hydrationCanBeAborted = true;

import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { PageShell } from './PageShell'
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export { render, onHydrationEnd, onPageTransitionEnd, onPageTransitionStart, onBeforeRender }

let root;
let dehydratedState;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 10,
      staleTime: Infinity,
      retryDelay: 2000,
    },
  },
});

async function render(pageContext) {
  const { Page, pageProps } = pageContext

  if(!dehydratedState && pageContext.dehydratedState) {
    dehydratedState = pageContext.dehydratedState;
  }

  const page = (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <PageShell pageContext={pageContext}>
          <Page {...pageProps} />
        </PageShell>
      </Hydrate>
    </QueryClientProvider>
  )
  const container = document.getElementById('page-view');

  if (pageContext.isHydration) {
    root = hydrateRoot(container, page)
  } else {
    if (!root) {
      root = createRoot(container)
    }
    root.render(page)
  }
  document.title =  (pageContext.exports.documentProps || {}).title || (pageContext.documentProps || {}).title || 'Demo';
}

async function onBeforeRender(pageContext) {
  //const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  //await delay(1000);
  const { prefetchQueries } = pageContext.exports;

  if(prefetchQueries?.constructor == Object) {
    const queries = [];
    Object.entries(prefetchQueries).forEach(([key, query]) => {
      queries.push(queryClient.prefetchQuery([key], query.fn));
    });

    await Promise.all(queries);

    dehydratedState = dehydrate(queryClient);
  }
}

function onHydrationEnd() {
  console.log('Hydration finished; page is now interactive.')
}
function onPageTransitionStart() {
  console.log('Page transition start')
  document.querySelector('body').classList.add('page-is-transitioning')
}
function onPageTransitionEnd() {
  console.log('Page transition end')
  document.querySelector('body').classList.remove('page-is-transitioning')
}

/* To enable Client-side Routing:
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
