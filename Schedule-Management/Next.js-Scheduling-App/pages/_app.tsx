import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import Spinner from "@/components/Spinner/Spinner";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Spinner />
    </Provider>
  );
}

export default MyApp;
