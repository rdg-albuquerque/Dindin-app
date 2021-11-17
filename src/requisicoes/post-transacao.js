import getDay from "date-fns/getDay";
import { diaSemana } from "../utils/dia-semana";

export default async function postTransacao(valueInput, tipoTransacao) {
    const data = new Date(`${valueInput.data}T03:00:00.000Z`);
    const indiceDiaSemana = getDay(data);
    const dia = diaSemana[indiceDiaSemana];

    try {
        await fetch("http://localhost:3333/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: data,
                week_day: dia,
                description: valueInput.descricao,
                value: Number(valueInput.valor),
                category: valueInput.categoria,
                type: tipoTransacao,
            }),
        });
    } catch (error) {
        console.log(error);
    }
}
