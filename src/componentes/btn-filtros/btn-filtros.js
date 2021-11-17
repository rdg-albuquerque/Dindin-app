import "./style.css";

export default function BtnFiltros(props) {
    return (
        <button className="btn-filtros">
            <span>{props.dia}</span>
            <span>+</span>
        </button>
    );
}
