import { useRef, useState } from "react";
import { useTransacoes } from "../../hooks/useTransacoes";
import BtnFiltros from "../btn-filtros/btn-filtros";
import "./style.css";

export default function FiltrosContainer() {
    const { transacoes, setTransacoes } = useTransacoes();
    const [inputFiltroValor, setInputFiltroValor] = useState({
        min: "",
        max: "",
    });
    const transacoesAux = useRef(transacoes); //Salvar transações originais e não se perder quando aplicar os filtros

    function handleAplicarFiltros() {
        if (!inputFiltroValor.min && !inputFiltroValor.max) return setTransacoes([...transacoesAux.current]);

        const transacoesFiltradas = transacoesAux.current.filter((transacao) => {
            const numberValorTransacao = Number(transacao.value);
            const numberMin = Number(inputFiltroValor.min),
                numberMax = Number(inputFiltroValor.max);

            if (!numberMin) return numberValorTransacao <= numberMax;
            if (!numberMax) return numberValorTransacao >= numberMin;
            return numberValorTransacao >= numberMin && numberValorTransacao <= numberMax;
        });
        setTransacoes([...transacoesFiltradas]);
    }

    function handleLimparFiltros() {
        setTransacoes([...transacoesAux.current]);
        setInputFiltroValor({ min: "", max: "" });
    }

    const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
    return (
        <div className="filtros-container flex-row mb-50">
            <div className="dias">
                <h1 className="filtro_h1 mb-20">Dia da semana</h1>
                <div className="dias-container">
                    {diasSemana.map((dia, index) => (
                        <BtnFiltros dia={dia} key={index} />
                    ))}
                </div>
            </div>

            <div className="categorias">
                <h1 className="filtro_h1 mb-20">Categoria</h1>
                <div className="categorias-container">{/* Categorias */}</div>
            </div>

            <div className="valor">
                <h1 className="filtro_h1 mb-20">Valor</h1>
                <div className="valor-container mb-20">
                    <label className="min-container">
                        <span className="min-texto">Min</span>
                        <input
                            value={inputFiltroValor.min}
                            onChange={(e) =>
                                setInputFiltroValor({
                                    ...inputFiltroValor,
                                    min: e.target.value,
                                })
                            }
                            type="number"
                            className="min-input"
                        />
                    </label>
                    <label className="max-container">
                        <span className="max-texto">Max</span>
                        <input
                            value={inputFiltroValor.max}
                            onChange={(e) =>
                                setInputFiltroValor({
                                    ...inputFiltroValor,
                                    max: e.target.value,
                                })
                            }
                            type="number"
                            className="max-input"
                        />
                    </label>
                </div>
                <div className="self-end">
                    <button onClick={handleLimparFiltros} className="btn-limpar-filtros mr-20">
                        Limpar Filtros
                    </button>
                    <button onClick={handleAplicarFiltros} className="btn-apply-filtros">
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </div>
    );
}
