import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { persistStore } from "reduxjs-toolkit-persist";
import store from "./redux/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SettingUpAnApp from "./components/Skeletons/SettingUpAnApp";
import { ToggleProvider } from "./contexts/ToggleProvider";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: { main: "#7269ef" },
  },
});

const clientQuery = new QueryClient({});

const root = createRoot(document.getElementById("root") as HTMLElement);

const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <div className="min-h-screen bg-gray-50">
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <QueryClientProvider client={clientQuery}>
            <PersistGate persistor={persistor} loading={<SettingUpAnApp />}>
              <ToggleProvider>
                <Router>
                  <App />
                </Router>
              </ToggleProvider>
            </PersistGate>
          </QueryClientProvider>
        </ReduxProvider>
      </ThemeProvider>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
