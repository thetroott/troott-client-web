import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/app.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <AppProvider>
      <QueryClientProvider client={queryClient}> 
      <App />
      </QueryClientProvider>
    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring perform ance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
