export default function getTimestamp(stringDate) {
    const date = new Date(stringDate);
    const timestamp = +date;
    return timestamp;
}
