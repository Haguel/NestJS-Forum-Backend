export default (date: string | null): Date | null => {
    if (date) return new Date(date);

    return null;
}