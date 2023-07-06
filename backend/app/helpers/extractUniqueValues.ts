export function extractUniqueValues(result: { result: string[] }[]): string[] {
    const uniqueValues = new Set<string>();

    result.forEach((item) => {
        if (item && item.result && Array.isArray(item.result)) {
            item.result.forEach((value) => {
                if (typeof value === 'string') {
                    uniqueValues.add(value);
                }
            });
        }
    });

    return Array.from(uniqueValues);
}