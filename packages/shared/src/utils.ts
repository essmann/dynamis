//Gets day of the week if it was less than one week ago, the string date otherwise.
export const computeRelativeDate = (date: string): string => {
    const dateEpoch = Math.floor(Date.parse(date) / 1000);
    const nowEpoch = Math.floor(Date.now() / 1000);
    const oneWeekInSeconds = 7 * 24 * 60 * 60;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = new Date(dateEpoch * 1000).getDay();
    return dateEpoch <= nowEpoch && dateEpoch >= (nowEpoch - oneWeekInSeconds) ? daysOfWeek[day] : date;


}
