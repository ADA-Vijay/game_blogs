import "@/styles/globals.css";
import Header from "@/components/header";
import { DefaultSeo } from "next-seo";
import SEOConfig from '../next-seo.config';
export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEOConfig} />
       <Header />
      <Component {...pageProps} />
    </>
  );
}
