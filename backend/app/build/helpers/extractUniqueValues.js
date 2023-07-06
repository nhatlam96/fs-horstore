"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUniqueValues = void 0;
function extractUniqueValues(result) {
    const uniqueValues = new Set();
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
exports.extractUniqueValues = extractUniqueValues;
