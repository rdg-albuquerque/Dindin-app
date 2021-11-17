import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { TransacoesProvider } from "./contexts/transacoes";

ReactDOM.render(
    <React.StrictMode>
        <TransacoesProvider>
            <App />
        </TransacoesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
