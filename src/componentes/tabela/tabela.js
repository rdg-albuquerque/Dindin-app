import "./style.css";
import lapis from "../../assets/lapis.svg";
import lixeira from "../../assets/lixeira.svg";
import ModalDeletarItem from "../modal-deletar-item/modal-deletar-item";
import { format } from "date-fns";
import { useRef, useState } from "react";
import arrowUp from "../../assets/arrow-up.svg";
import arrowDown from "../../assets/arrow-down.svg";
import getTimestamp from "../../utils/get-timestamp";
import getDia from "../../utils/getDia";
import { useTransacoes } from "../../hooks/useTransacoes";

export default function Tabela() {
    const { modalAberto, setModalAberto, transacoes, setTransacoes, setTransacaoInfo } = useTransacoes();
    const [modalDeletarAberto, setModalDeletarAberto] = useState();
    const modalDeletarIndex = useRef();

    const ordenacoesAuxiliar = useRef({
        data: null,
        diaSemana: null,
        valor: null,
    });
    const [ordenacoes, setOrdenacoes] = useState({ ...ordenacoesAuxiliar.current });

    function handleOrdenarPorData() {
        const ordenacoesTemp = { ...ordenacoesAuxiliar, data: !ordenacoes.data };

        let transacoesOrdenadas;
        if (ordenacoesTemp.data === true) {
            transacoesOrdenadas = transacoes.sort((a, b) => getTimestamp(a.date) - getTimestamp(b.date));
        } else {
            transacoesOrdenadas = transacoes.sort((a, b) => getTimestamp(b.date) - getTimestamp(a.date));
        }
        setOrdenacoes(ordenacoesTemp);
        setTransacoes([...transacoesOrdenadas]);
    }

    function handleOrdenarPorDia() {
        const ordenacoesTemp = { ...ordenacoesAuxiliar, diaSemana: !ordenacoes.diaSemana };

        let transacoesOrdenadas;
        if (ordenacoesTemp.diaSemana === true) {
            transacoesOrdenadas = transacoes.sort((a, b) => getDia(a.date) - getDia(b.date));
        } else {
            transacoesOrdenadas = transacoes.sort((a, b) => getDia(b.date) - getDia(a.date));
        }
        console.log(transacoesOrdenadas);
        setOrdenacoes(ordenacoesTemp);
        setTransacoes([...transacoesOrdenadas]);
    }

    function handleOrdenarPorValor() {
        const ordenacoesTemp = { ...ordenacoesAuxiliar, valor: !ordenacoes.valor };

        let transacoesOrdenadas;
        if (ordenacoesTemp.valor === true) {
            transacoesOrdenadas = transacoes.sort((a, b) => a.value - b.value);
        } else {
            transacoesOrdenadas = transacoes.sort((a, b) => b.value - a.value);
        }
        console.log(transacoesOrdenadas);
        setOrdenacoes(ordenacoesTemp);
        setTransacoes([...transacoesOrdenadas]);
    }

    return (
        <table className="tabela mr-30">
            <thead>
                <tr>
                    <th>
                        <button className="flex-row align-center" onClick={handleOrdenarPorData}>
                            <span>Data</span>
                            {ordenacoes.data === true && <img className="ml-5" src={arrowUp} alt="" />}
                            {ordenacoes.data === false && <img className="ml-5" src={arrowDown} alt="" />}
                        </button>
                    </th>
                    <th>
                        <button className="flex-row align-center" onClick={handleOrdenarPorDia}>
                            <span>Dia da Semana</span>
                            {ordenacoes.diaSemana === true && <img className="ml-5" src={arrowUp} alt="" />}
                            {ordenacoes.diaSemana === false && (
                                <img className="ml-5" src={arrowDown} alt="" />
                            )}
                        </button>
                    </th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>
                        <button className="flex-row align-center" onClick={handleOrdenarPorValor}>
                            <span>Valor</span>
                            {ordenacoes.valor === true && <img className="ml-5" src={arrowUp} alt="" />}
                            {ordenacoes.valor === false && <img className="ml-5" src={arrowDown} alt="" />}
                        </button>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {transacoes.map((transacao, index) => {
                    const data = new Date(transacao.date);
                    const dataFormatada = format(data, "dd/MM/yy");
                    const valorEmReais = transacao.value.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    });

                    return (
                        <tr key={index}>
                            <td className="td-data">{dataFormatada}</td>
                            <td>{transacao.week_day}</td>
                            <td>{transacao.description}</td>
                            <td>{transacao.category}</td>
                            <td className={transacao.type === "debit" ? "valor-positivo" : "valor-negativo"}>
                                {valorEmReais}
                            </td>
                            <td className="td-editar-deletar">
                                <button
                                    onClick={() => {
                                        setTransacaoInfo(transacao);
                                        setModalAberto({ ...modalAberto, editar: true });
                                    }}
                                >
                                    <img src={lapis} alt="editar" />
                                </button>
                                <button
                                    className="btn-deletar"
                                    onClick={() => {
                                        modalDeletarIndex.current = index;
                                        setModalDeletarAberto(true);
                                    }}
                                >
                                    <img src={lixeira} alt="excluir" />
                                </button>

                                {modalDeletarIndex.current === index && modalDeletarAberto && (
                                    <ModalDeletarItem
                                        idTransacao={transacao.id}
                                        index={index}
                                        modalDeletarAberto={modalDeletarAberto}
                                        setModalDeletarAberto={setModalDeletarAberto}
                                        setTransacoes={setTransacoes}
                                    />
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
