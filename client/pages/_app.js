import Layout from "@/components/Layout";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const progress = new ProgressBar({
  size: 4,
  color: "rgb(185, 28, 28)",
  className: "z-50",
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout className={roboto.className}>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
