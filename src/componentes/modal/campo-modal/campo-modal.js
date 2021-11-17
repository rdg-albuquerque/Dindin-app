import "./style.css";

export default function CampoModal({ children, nome, valueInput, setValueInput }) {
    return (
        <div className="modal__campo">
            <h2 className="nome-campo">{children}</h2>
            <input
                onChange={(e) => {
                    if (nome === "valor") setValueInput({ ...valueInput, valor: e.target.value });
                    if (nome === "categoria") setValueInput({ ...valueInput, categoria: e.target.value });
                    if (nome === "data") setValueInput({ ...valueInput, data: e.target.value });
                    if (nome === "descricao") setValueInput({ ...valueInput, descricao: e.target.value });
                }}
                value={valueInput[nome]}
                className="input-campo"
                type={nome === "valor" ? "number" : nome === "data" ? "date" : "text"}
            />
        </div>
    );
}
