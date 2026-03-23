import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { useEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <CartProvider>
        <Toaster position="top-right" toastOptions={{ duration: 2200 }} />
        {getLayout(<Component {...pageProps} />)}
      </CartProvider>
    </>
  );
}
  