import "@/styles/globals.css";
import { AuthProvider } from "@/context/authCtx";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
