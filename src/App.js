import { useEffect } from "react";
import "./App.css";
import BtnAbrirFiltros from "./componentes/btn-abrir-filtros/btn-abrir-filtros";
import FiltrosContainer from "./componentes/filtros_container/filtros_container";
import Header from "./componentes/header/Header";
import Modal from "./componentes/modal/modal";
import Resumo from "./componentes/resumo/resumo";
import Tabela from "./componentes/tabela/tabela";
import { useTransacoes } from "./hooks/useTransacoes";
import "./layout.css";
import getTransacoes from "./requisicoes/get-transacoes";

function App() {
    const { setTransacoes, modalAberto, filtroContainerAberto } = useTransacoes();

    useEffect(() => {
        try {
            getTransacoes(setTransacoes);
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const body = document.querySelector("body");
        if (modalAberto.adicionar || modalAberto.editar) {
            body.style.overflow = "hidden";
            return;
        }
        body.style.overflow = "auto";
    }, [modalAberto]);

    return (
        <div className="App">
            <Header />
            <section className="section">
                <div>
                    <BtnAbrirFiltros />
                    {filtroContainerAberto && <FiltrosContainer />}
                    <Tabela />
                </div>
                <Resumo />
            </section>
            {modalAberto.adicionar && <Modal>Adicionar Registro</Modal>}
            {modalAberto.editar && <Modal>Editar Registro</Modal>}
        </div>
    );
}

export default App;
