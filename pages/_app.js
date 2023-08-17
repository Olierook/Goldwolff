import DatabaseProvider from "../context/dbContext";
import UserProvider from "../context/userContext";
import { StoreProvider } from "../context/Store";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import Router from "next/router";
import ReactDOM from "react-dom";
import { colors } from "../lib/colors";


import PageChange from "/components/Mui/PageChange/PageChange.js";

import "/styles/scss/nextjs-material-kit.scss?v=1.2.0";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

// Custom App to wrap it with context provider
// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StoreProvider>
        <UserProvider>
          <DatabaseProvider>
            <Component {...pageProps} />
            <Analytics />
          </DatabaseProvider>
        </UserProvider>
      </StoreProvider>
      <style jsx global>
        {`
        *:focus {
            outline: none;
        }
        body {
          background-color: ${colors.content};
          color: ${colors.contentText};
          overflow-x: hidden;
        }        
        `}
      </style>

    </>
  );
}
