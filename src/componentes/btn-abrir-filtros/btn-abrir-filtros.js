import "./style.css";
import filtrar from "../../assets/filtrar.svg";
import { useTransacoes } from "../../hooks/useTransacoes";

export default function BtnAbrirFiltros() {
    const { filtroContainerAberto, setFiltroContainerAberto } = useTransacoes();
    return (
        <button
            onClick={() => setFiltroContainerAberto(!filtroContainerAberto)}
            className="btn-filtrar flex-row align-center mb-30"
        >
            <img className="mr-5" src={filtrar} alt="" />
            <span>Filtrar</span>
        </button>
    );
}
