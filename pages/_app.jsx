import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { useEffect } from "react";
import Head from "next/head";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <CartProvider>
        <Toaster position="top-right" toastOptions={{ duration: 2200 }} />
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}
