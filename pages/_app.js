import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { fetcher } from "/utils/swr";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
