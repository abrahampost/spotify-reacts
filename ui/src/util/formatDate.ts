export const formatDate = (dateString: string) => {
    let date = new Date(dateString);
    let formattedDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()} ${date.toLocaleTimeString()}`;
    return formattedDate;
}