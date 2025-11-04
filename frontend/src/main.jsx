// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ErrorBoundary>
                    <ThemeProvider>
                        <HashRouter>
                            <App />
                        </HashRouter>
                    </ThemeProvider>
                </ErrorBoundary>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
