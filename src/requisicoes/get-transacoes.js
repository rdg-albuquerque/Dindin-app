export default async function getTransacoes(setTransacoes) {
    try {
        const response = await fetch("http://localhost:3333/transactions");
        const data = await response.json();
        setTransacoes(data);
    } catch (error) {
        console.log(error);
    }
}
