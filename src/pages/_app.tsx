import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Anton } from "next/font/google";
import { Container } from "react-bootstrap";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={anton.className}>
        <main>
          <Container className="py-4">
            <Component {...pageProps} />
          </Container>
        </main>
      </div>
    </>
  );
}
