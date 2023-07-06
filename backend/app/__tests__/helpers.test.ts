import { getImagePath } from '../helpers/getImagePath';
import { extractUniqueValues } from '../helpers/extractUniqueValues';

describe('getImagePath', () => {
    it('should return the correct image path for a given filename', () => {
        expect(getImagePath('74152-4.jpeg')).toBe('http://localhost:9000/image/74152-4.jpeg');
    });
});

describe('extractUniqueValues', () => {
    it('should return an empty array when input list is empty', () => {
        expect(extractUniqueValues([])).toEqual([]);
    });

    it('should return unique values from the input list', () => {
        const inputList = [
            { result: ['Sattel', 'Zaumzeug', 'Sattel', 'Halfter'] },
            { result: ['Halfter', 'Sattel', 'Gerte'] },
        ];
        expect(extractUniqueValues(inputList as { result: string[] }[])).toEqual(['Sattel', 'Zaumzeug', 'Halfter', 'Gerte']);
    });
});