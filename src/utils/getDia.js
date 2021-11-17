import getDay from "date-fns/getDay";

export default function getDia(dataString) {
    const data = new Date(dataString);
    const indiceDia = getDay(data);
    return indiceDia;
}
