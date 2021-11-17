import "./style.css";
import close from "../../assets/close-btn.svg";
import CampoModal from "./campo-modal/campo-modal";
import fecharModal from "../../utils/fechar-modal";
import { useEffect, useRef, useState } from "react";
import getTransacoes from "../../requisicoes/get-transacoes";
import postTransacao from "../../requisicoes/post-transacao";
import format from "date-fns/format";
import putTransacao from "../../requisicoes/put-transacao";
import { useTransacoes } from "../../hooks/useTransacoes";

export default function Modal() {
    const { setTransacoes, modalAberto, setModalAberto, transacaoInfo, children } = useTransacoes();

    let entradasSaidas;
    if (modalAberto.adicionar) {
        // Quando adicionar uma transação ela sempre virá com saída pré-selecionado.
        entradasSaidas = { entrada: false, saida: true };
    } else {
        if (transacaoInfo.type === "debit") {
            //Quando editar uma transação e ela for do tipo debit, entrada virá selecionado por padrão. Caso contrário será saída.
            entradasSaidas = { entrada: true, saida: false };
        } else {
            entradasSaidas = { entrada: false, saida: true };
        }
    }

    const [btnAtivo, setBtnAtivo] = useState(entradasSaidas);
    const btnEntradaRef = useRef();
    const btnSaidaRef = useRef();

    let dataFormatada;
    if (transacaoInfo) {
        //Botão de editar foi clicado e as informações da transação foram passadas para transacaoInfo
        const data = new Date(transacaoInfo.date);
        dataFormatada = format(data, "yyyy-MM-dd");
    }

    const [valueInput, setValueInput] = useState({
        valor: modalAberto.editar ? transacaoInfo.value : "",
        categoria: modalAberto.editar ? transacaoInfo.category : "",
        data: modalAberto.editar ? dataFormatada : "",
        descricao: modalAberto.editar ? transacaoInfo.description : "",
    });

    const [mensagemErro, setMensagemErro] = useState(false);

    useEffect(() => {
        if (btnAtivo.entrada) {
            btnEntradaRef.current.classList.add("btn-entrada-clicado");
            btnSaidaRef.current.classList.remove("btn-saida-clicado");
        }

        if (btnAtivo.saida) {
            btnSaidaRef.current.classList.add("btn-saida-clicado");
            btnEntradaRef.current.classList.remove("btn-entrada-clicado");
        }
    }, [btnAtivo]);

    async function handleConfirmar() {
        setMensagemErro(false);
        if (!valueInput.valor || !valueInput.categoria || !valueInput.data || !valueInput.descricao) {
            setMensagemErro(true);
            return;
        }

        if (modalAberto.adicionar) {
            //Se adicionar registro foi clicado
            if (btnAtivo.entrada) {
                try {
                    postTransacao(valueInput, "debit");
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    postTransacao(valueInput, "credit");
                } catch (error) {
                    console.log(error);
                }
            }
        }

        if (modalAberto.editar) {
            //Se editar registro foi clicado
            if (btnAtivo.entrada) {
                try {
                    putTransacao(valueInput, "debit", transacaoInfo.id);
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    putTransacao(valueInput, "credit", transacaoInfo.id);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        fecharModal(modalAberto, setModalAberto);
        getTransacoes(setTransacoes);
    }

    return (
        <div
            onClick={() => {
                fecharModal(modalAberto, setModalAberto);
            }}
            className="modal"
        >
            <div onClick={(e) => e.stopPropagation()} className="modal__container">
                <div className="flex-row justify-between mb-50">
                    <h1>{children}</h1>
                    <button
                        onClick={() => {
                            fecharModal(modalAberto, setModalAberto);
                        }}
                    >
                        <img src={close} alt="Fechar" />
                    </button>
                </div>
                <div className="flex-row mb-40">
                    <button
                        ref={btnEntradaRef}
                        onClick={() => setBtnAtivo({ entrada: true, saida: false })}
                        className="btn-entrada btn-entrada-clicado"
                    >
                        Entrada
                    </button>
                    <button
                        ref={btnSaidaRef}
                        onClick={() => setBtnAtivo({ entrada: false, saida: true })}
                        className="btn-saida"
                    >
                        Saída
                    </button>
                </div>

                {mensagemErro && (
                    <div className="mensagem-erro">
                        <span>Todos os campos são obrigatórios !</span>
                    </div>
                )}
                <CampoModal valueInput={valueInput} setValueInput={setValueInput} nome="valor">
                    Valor
                </CampoModal>
                <CampoModal valueInput={valueInput} setValueInput={setValueInput} nome="categoria">
                    Categoria
                </CampoModal>
                <CampoModal valueInput={valueInput} setValueInput={setValueInput} nome="data">
                    Data
                </CampoModal>
                <CampoModal valueInput={valueInput} setValueInput={setValueInput} nome="descricao">
                    Descrição
                </CampoModal>
                <button onClick={handleConfirmar} className="btn-inserir">
                    Confirmar
                </button>
            </div>
        </div>
    );
}
