export function splitArrayIntoChunks<T>(array: T[], size: number): T[][] {
    return array.reduce((acc: T[][], _, i: number) => {
        if (i % size === 0) {
            acc.push(array.slice(i, i + size));
        }
        return acc;
    }, []);
}
