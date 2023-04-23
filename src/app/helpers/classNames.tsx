export default function classNames(
    condition: boolean,
    defaultClasses: string,
    newClasses: string
): string {
    let finalClasses = condition
        ? `${defaultClasses} ${newClasses}`
        : defaultClasses;
    return finalClasses;
}
