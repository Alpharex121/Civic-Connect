import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./store/store";
// import SignUpSuccess from "./components/SignUpSuccess";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastProvider } from "./components/ToastContext";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        {/* <ToastProvider> */}
        <Header />
        <Outlet />
        <Footer />
        {/* <ToastContainer /> */}

        {/* </ToastProvider> */}
      </Provider>
    </>
  );
};

export default App;
