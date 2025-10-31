import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store";
import "../styles/global.css";
import { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { login, logout } from "../features/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthListener() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) dispatch(login({ uid: user.uid, email: user.email }));
      else dispatch(logout());
    });
    return () => unsub();
  }, []);
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthListener />
      <ToastContainer position="top-right" autoClose={3000} />
      <Component {...pageProps} />
    </Provider>
  );
}
