import { useTransacoes } from "../../hooks/useTransacoes";
import "./style.css";

export default function Resumo() {
    const { modalAberto, setModalAberto, transacoes } = useTransacoes();

    const somaEntrada = transacoes
        .filter((transacao) => transacao.type === "debit")
        .map((transacao) => transacao.value)
        .reduce((acc, curr) => acc + curr, 0);

    const somaSaida = transacoes
        .filter((transacao) => transacao.type === "credit")
        .map((transacao) => transacao.value)
        .reduce((acc, curr) => acc + curr, 0);

    const entradaBRL = somaEntrada.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
    const saidaBRL = somaSaida.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
    const saldo = (somaEntrada - somaSaida).toLocaleString("pt-br", { style: "currency", currency: "BRL" });

    return (
        <div className="resumo">
            <div className="resumo__container mb-20">
                <h1 className="resumo__h1">Resumo</h1>
                <div className="flex-row justify-between mb-10">
                    <span className="entrada-texto mr-10">Entradas</span>
                    <span className="entrada-valor">{entradaBRL}</span>
                </div>
                <div className="flex-row justify-between mb-20">
                    <span className="saida-texto mr-10">Saídas</span>
                    <span className="saida-valor">{saidaBRL}</span>
                </div>
                <div className="saldo-container">
                    <span className="saldo-texto mr-10">Saldo</span>
                    <span className="saldo-valor">{saldo}</span>
                </div>
            </div>
            <button onClick={() => setModalAberto({ ...modalAberto, adicionar: true })} className="btn-add">
                Adicionar Registro
            </button>
        </div>
    );
}
