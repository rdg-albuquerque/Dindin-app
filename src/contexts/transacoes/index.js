import { createContext } from "react";
import { useTransacoesProvider } from "../../hooks/useTransacoes";

const transacoesContext = createContext();

function TransacoesProvider({ children }) {
    const value = useTransacoesProvider();

    return <transacoesContext.Provider value={value}>{children}</transacoesContext.Provider>;
}

export { transacoesContext, TransacoesProvider };
