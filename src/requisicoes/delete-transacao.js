export default async function deleteTransacao(id) {
    try {
        await fetch(`http://localhost:3333/transactions/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.log(error);
    }
}
