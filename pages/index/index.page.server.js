import fetch from 'node-fetch';

async function onBeforeRender(pageContext) {
  //const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  //await delay(1000);
  // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.
  //const response = await fetch('https://jsonplaceholder.typicode.com/users')

  //let users = await response.json()
  const users = [];
  // We make `movies` available as `pageContext.pageProps.movies`
  const pageProps = { ...pageContext.pageProps, users }
  return {
    pageContext: {
      pageProps
    }
  }
}

//export { onBeforeRender }