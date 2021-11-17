import deleteTransacao from "../../requisicoes/delete-transacao";
import getTransacoes from "../../requisicoes/get-transacoes";
import "./style.css";

export default function ModalDeletarItem({ setTransacoes, setModalDeletarAberto, index, idTransacao }) {
    async function handleDeletar(id) {
        deleteTransacao(idTransacao);
        setModalDeletarAberto(false);
        getTransacoes(setTransacoes);
    }

    return (
        <div key={index} className={`modal-deletar-item`}>
            <span className="deletar__span mb-5">Apagar item ?</span>
            <div className="deletar__container flex-row justify-between">
                <button onClick={() => handleDeletar(idTransacao)} className="deletar__sim mr-5">
                    Sim
                </button>
                <button onClick={() => setModalDeletarAberto(false)} className="deletar__nao">
                    Não
                </button>
            </div>
        </div>
    );
}
