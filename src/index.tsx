import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import { PageLoadingProvider } from "./context/PageLoadingContext";
import { FiltersProvider } from "./context/FiltersContext/FiltersContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <FiltersProvider>
      <CookiesProvider>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT as string}>
          <PageLoadingProvider>
            <AuthContextProvider>
              <App />
              <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </AuthContextProvider>
          </PageLoadingProvider>
        </GoogleOAuthProvider>
      </CookiesProvider>
    </FiltersProvider>
  </BrowserRouter>
);
