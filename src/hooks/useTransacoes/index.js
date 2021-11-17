import { useContext, useState } from "react";
import { transacoesContext } from "../../contexts/transacoes";

function useTransacoes() {
    return useContext(transacoesContext);
}

function useTransacoesProvider() {
    const [transacoes, setTransacoes] = useState([]);
    const [modalAberto, setModalAberto] = useState({
        adicionar: false,
        editar: false,
    });
    const [transacaoInfo, setTransacaoInfo] = useState();
    const [filtroContainerAberto, setFiltroContainerAberto] = useState(false);

    return {
        transacoes,
        setTransacoes,
        modalAberto,
        setModalAberto,
        transacaoInfo,
        setTransacaoInfo,
        filtroContainerAberto,
        setFiltroContainerAberto,
    };
}

export { useTransacoes, useTransacoesProvider };
